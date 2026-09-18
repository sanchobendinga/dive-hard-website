import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Join the newsletter",
  description:
    "Get Dive Hard expedition dates, new films, workshop seats, and merch drops from Kabir Teja.",
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="section-eyebrow">Newsletter</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Stay close to the work.
      </h1>
      <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
        Trip announcements, 4K/8K premieres, workshop seats, and merch — from {SITE.creator} at Dive Hard.
        Warm, short, specific. No weekly noise.
      </p>

      <div className="mt-10 rounded-3xl border border-border bg-card p-6 sm:p-8">
        <NewsletterForm source="join-page" cta="Join Dive Hard" />
      </div>

      <p className="mt-8 text-sm text-muted">
        Prefer social?{" "}
        <a
          href={SITE.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring text-teal hover:text-teal-bright"
        >
          YouTube
        </a>{" "}
        ·{" "}
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring text-teal hover:text-teal-bright"
        >
          Instagram
        </a>{" "}
        · or{" "}
        <Link href="/merch" className="focus-ring text-teal hover:text-teal-bright">
          peek at merch
        </Link>
        .
      </p>
    </div>
  );
}
