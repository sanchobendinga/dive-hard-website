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

  try {
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
  } catch (err) {
    console.error("subscribe error", err);
    return NextResponse.json(
      { error: "Could not save that right now. Try again shortly." },
      { status: 500 },
    );
  }
}
