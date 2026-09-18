import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSection() {
  return (
    <section
      id="newsletter"
      className="scroll-mt-20 border-y border-border bg-gradient-to-br from-navy via-navy-deep to-background"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-20">
        <div>
          <p className="section-eyebrow">Newsletter</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            First look at trips, films, and drops.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Short notes from Kabir — expedition dates, new 4K/8K cuts, workshop seats, and merch when it&apos;s actually ready.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <NewsletterForm source="home-newsletter" compact />
        </div>
      </div>
    </section>
  );
}
