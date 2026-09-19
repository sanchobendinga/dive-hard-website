import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

type Subscriber = {
  email: string;
  source: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function loadSubscribers(): Promise<Subscriber[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Subscriber[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveLocally(email: string, source: string) {
  await mkdir(DATA_DIR, { recursive: true });
  const subscribers = await loadSubscribers();

  if (subscribers.some((s) => s.email === email)) {
    return NextResponse.json({
      message: "You're already on the list. We'll be in touch.",
    });
  }

  subscribers.push({
    email,
    source,
    createdAt: new Date().toISOString(),
  });

  await writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2) + "\n", "utf8");

  return NextResponse.json({
    message: "You're on the list. Talk soon.",
  });
}

async function postToSheetsWebhook(
  webhookUrl: string,
  secret: string,
  email: string,
  source: string,
) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, email, source }),
  });

  let data: { message?: string; error?: string } = {};
  try {
    data = (await res.json()) as { message?: string; error?: string };
  } catch {
    // non-JSON body
  }

  const message = typeof data.message === "string" ? data.message : "";
  const already =
    /already/i.test(message) || /already subscribed/i.test(message);

  if (res.ok || already) {
    return NextResponse.json({
      message: already
        ? "You're already on the list. We'll be in touch."
        : message || "You're on the list. Talk soon.",
    });
  }

  console.error("sheets webhook error", {
    status: res.status,
    body: data,
  });
  return NextResponse.json(
    { error: "Could not save that right now. Try again shortly." },
    { status: 502 },
  );
}

export async function POST(request: Request) {
  let body: { email?: string; source?: string };

  try {
    body = (await request.json()) as { email?: string; source?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = (body.source || "unknown").trim().slice(0, 64) || "unknown";

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const webhookUrl = process.env.SHEETS_WEBHOOK_URL?.trim();
  const webhookSecret = process.env.SHEETS_WEBHOOK_SECRET?.trim();
  const hasWebhook = Boolean(webhookUrl && webhookSecret);
  const isProd = process.env.NODE_ENV === "production";

  if (isProd && !hasWebhook) {
    console.error(
      "subscribe misconfigured: SHEETS_WEBHOOK_URL and SHEETS_WEBHOOK_SECRET required in production",
    );
    return NextResponse.json(
      { error: "Could not save that right now. Try again shortly." },
      { status: 500 },
    );
  }

  try {
    if (hasWebhook) {
      return await postToSheetsWebhook(
        webhookUrl!,
        webhookSecret!,
        email,
        source,
      );
    }

    // Development fallback when webhook envs are missing
    return await saveLocally(email, source);
  } catch (err) {
    console.error("subscribe error", err);
    if (hasWebhook) {
      return NextResponse.json(
        { error: "Could not save that right now. Try again shortly." },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { error: "Could not save that right now. Try again shortly." },
      { status: 500 },
    );
  }
}
