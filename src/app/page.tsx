import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NewsletterSection } from "@/components/NewsletterSection";
import { VideoCard } from "@/components/VideoCard";
import { SITE, VIDEOS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero — spare, high contrast */}
      <section className="grain relative isolate border-b border-border">
        <div className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
          <Logo size="lg" invert href={null} priority className="mb-10 opacity-90" />
          <p className="section-eyebrow">Underwater cinema · {SITE.creator}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Make the dive
            <span className="block text-chrome">hard to forget.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#join"
              className="focus-ring btn-fill px-6 py-3 text-sm font-semibold transition"
            >
              Join the list
            </Link>
            <Link
              href="#watch"
              className="focus-ring btn-outline px-6 py-3 text-sm font-semibold transition"
            >
              Watch the films
            </Link>
          </div>
        </div>
      </section>

      {/* Email signup — prominent */}
      <NewsletterSection />

      {/* Watch */}
      <section id="watch" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-eyebrow">Watch</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Recent films
              </h2>
            </div>
            <a
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-sm font-medium text-chrome hover:text-foreground"
            >
              Full channel on YouTube →
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {VIDEOS.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </section>

      {/* Merch TBD */}
      <section id="merch" className="scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="border border-dashed border-border bg-card px-6 py-14 text-center sm:px-10">
            <p className="section-eyebrow">Merch</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">
              Soft goods are TBD. Join the list if you want first word when something ships.
            </p>
            <Link
              href="/merch"
              className="focus-ring btn-outline mt-6 inline-flex px-5 py-3 text-sm font-semibold transition"
            >
              Merch page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
