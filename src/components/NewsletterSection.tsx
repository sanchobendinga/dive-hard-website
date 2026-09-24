import { NewsletterForm } from "./NewsletterForm";

export function NewsletterSection() {
  return (
    <section id="join" className="scroll-mt-20 border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-20">
        <div>
          <p className="section-eyebrow">Join</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Join the list
          </h2>
        </div>
        <div className="border border-border bg-background p-6 sm:p-8">
          <NewsletterForm source="home-newsletter" compact />
        </div>
      </div>
    </section>
  );
}
