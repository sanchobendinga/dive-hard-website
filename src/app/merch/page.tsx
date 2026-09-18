import type { Metadata } from "next";
import { NewsletterForm } from "@/components/NewsletterForm";
import { MERCH } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Dive Hard merch coming soon — tee, hoodie, sticker pack, and cap. Notify interest for the drop.",
};

export default function MerchPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="max-w-2xl">
        <p className="section-eyebrow">Merch</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Gear with a period.
        </h1>
        <p className="mt-4 text-base text-muted sm:text-lg">
          Placeholder drop — nothing for sale yet. Leave your email if you want first dibs when DIVE HARD. soft goods go live.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {MERCH.map((item) => (
          <article
            key={item.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-navy to-background">
              <span className="wordmark text-2xl text-chrome/40 sm:text-3xl">DIVE HARD.</span>
              <span className="absolute right-4 top-4 rounded-full border border-teal/40 bg-navy-deep/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                Coming soon
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm text-muted">{item.price}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted">{item.blurb}</p>
            </div>
          </article>
        ))}
      </div>

      <div
        id="notify"
        className="mt-14 scroll-mt-24 rounded-3xl border border-border bg-navy-deep/60 p-6 sm:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="section-eyebrow">Notify interest</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Want the drop email?
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">
              Same list as the newsletter — tagged from merch so we know you care about the soft goods.
            </p>
          </div>
          <NewsletterForm source="merch" cta="Notify me" compact />
        </div>
      </div>
    </div>
  );
}
