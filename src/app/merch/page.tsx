import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Merch",
  description: "Dive Hard merch — coming soon.",
};

export default function MerchPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
      <Logo size="md" invert href={null} className="mb-10 max-w-full opacity-80" />
      <p className="section-eyebrow">Merch</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Coming soon
      </h1>
      <p className="mt-5 max-w-md text-base text-muted sm:text-lg">TBD</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/join"
          className="focus-ring btn-fill px-6 py-3 text-sm font-semibold transition"
        >
          Join the list
        </Link>
        <Link
          href="/"
          className="focus-ring btn-outline px-6 py-3 text-sm font-semibold transition"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
