import Image from "next/image";
import Link from "next/link";
import { NewsletterSection } from "@/components/NewsletterSection";
import { VideoCard } from "@/components/VideoCard";
import { DESTINATIONS, SITE, VIDEOS } from "@/lib/constants";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=2400&q=80";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Sunlit underwater reef — stock photography, not Dive Hard footage"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/55 to-background" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="section-eyebrow">Underwater cinema · {SITE.creator}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Make the dive
            <span className="block text-teal-bright">hard to forget.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-chrome sm:text-lg">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#watch"
              className="focus-ring rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy-deep transition hover:bg-teal-bright"
            >
              Watch the films
            </Link>
            <Link
              href="/join"
              className="focus-ring rounded-full border border-border bg-background/30 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-teal/50"
            >
              Join newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border">
            <Image
              src="/brand/avatar.jpg"
              alt={`${SITE.creator}, Dive Hard`}
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="section-eyebrow">About</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Small groups. Big water. Honest frames.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {SITE.description}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              From UW workshops to remote expeditions — Socorro, Raja Ampat, Cocos, Tubbataha — the goal is simple: shoot the most epic dive videos possible, then share them with the people who get it.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring font-medium text-teal hover:text-teal-bright"
              >
                YouTube {SITE.youtubeHandle} →
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring font-medium text-teal hover:text-teal-bright"
              >
                Instagram {SITE.instagramHandle} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Watch */}
      <section id="watch" className="scroll-mt-20 border-t border-border bg-navy-deep/40">
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
              className="focus-ring text-sm font-medium text-teal hover:text-teal-bright"
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

      {/* Destinations */}
      <section id="destinations" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="section-eyebrow">Destinations</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Water worth the flight.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Expedition teasers — not a booking engine. Stock photos below for mood; Dive Hard films live on YouTube.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d) => (
              <article
                key={d.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={d.image}
                    alt={`${d.name} underwater atmosphere — Unsplash stock`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-teal">{d.region}</p>
                    <h3 className="mt-1 text-xl font-semibold">{d.name}</h3>
                    <p className="mt-2 text-sm text-chrome">{d.blurb}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />

      {/* Merch tease */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-navy to-navy-deep p-8 sm:grid-cols-[1.2fr_1fr] sm:p-10 lg:items-center">
          <div>
            <p className="section-eyebrow">Merch</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              Chrome on black. Coming soon.
            </h2>
            <p className="mt-4 text-muted">
              Tee, hoodie, sticker pack, cap — spare wordmark gear for people who actually get wet.
            </p>
            <Link
              href="/merch"
              className="focus-ring mt-6 inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:bg-chrome"
            >
              Preview merch
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Tee", "Hoodie", "Stickers", "Cap"].map((label) => (
              <div
                key={label}
                className="flex aspect-square items-end rounded-2xl border border-border bg-background/40 p-4"
              >
                <span className="wordmark text-sm text-chrome">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course coming soon */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-3xl border border-dashed border-teal/40 bg-card/50 px-6 py-10 text-center sm:px-10">
            <p className="section-eyebrow justify-center">Course</p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              UW filmmaking course — coming soon
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
              Framing, light, and edit instincts from the boat to the timeline. Join the newsletter to hear when seats open.
            </p>
            <Link
              href="/join"
              className="focus-ring mt-6 inline-flex rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:border-teal/50"
            >
              Get notified
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
