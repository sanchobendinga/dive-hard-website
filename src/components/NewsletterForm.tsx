"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Props = {
  source?: string;
  cta?: string;
  compact?: boolean;
};

export function NewsletterForm({
  source = "newsletter",
  cta = "Join the list",
  compact = false,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again?");
        return;
      }

      setStatus("success");
      setMessage(data.message || "You're on the list. Talk soon.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network hiccup. Give it another go.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-none border border-foreground/30 bg-card px-5 py-6 text-left"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-foreground">You&apos;re in.</p>
        <p className="mt-1 text-sm text-chrome">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"} noValidate>
      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : "space-y-3"}>
        <label className="sr-only" htmlFor={`email-${source}`}>
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus-ring w-full border border-border bg-background px-5 py-3 text-sm text-foreground placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="focus-ring btn-fill shrink-0 px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Joining…" : cta}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-chrome" role="alert">
          {message}
        </p>
      )}
      <p className="text-xs text-muted">No spam.</p>
    </form>
  );
}
