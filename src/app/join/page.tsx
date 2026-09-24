import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Join the list",
  description: SITE.description,
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="section-eyebrow">Join</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Join the list
      </h1>

      <div className="mt-10 border border-border bg-card p-6 sm:p-8">
        <NewsletterForm source="join-page" cta="Join the list" />
      </div>

      <p className="mt-8 text-sm text-muted">
        <a
          href={SITE.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring text-chrome underline-offset-4 hover:text-foreground hover:underline"
        >
          YouTube
        </a>{" "}
        ·{" "}
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring text-chrome underline-offset-4 hover:text-foreground hover:underline"
        >
          Instagram
        </a>{" "}
        ·{" "}
        <Link
          href="/merch"
          className="focus-ring text-chrome underline-offset-4 hover:text-foreground hover:underline"
        >
          Merch
        </Link>
      </p>
    </div>
  );
}
