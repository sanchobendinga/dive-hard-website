import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  CHEST_COPY,
  DRYROBE_COLLAB as P,
  costLines,
  formatMm,
  formatUsd,
  totalPerRobe,
} from "@/lib/merch/dryrobe-collab";

const waterproof = formatMm(P.waterproofMm);
const total = totalPerRobe();
const price = formatUsd(total);
const provisional = P.pricing.provisional;

export const metadata: Metadata = {
  title: P.title,
  description: `${P.title}: limited first batch, ${waterproof} waterproof, white Dive Hard embroidery. Pre-order at cost, ${P.shipsTo}.`,
  robots: P.showDraftNotice ? { index: false, follow: false } : undefined,
  openGraph: { images: [{ url: P.images[P.chestOption].front.url, width: 1200, height: 1919, alt: P.images[P.chestOption].front.alt }] },
};

export default function DiveHardDryrobePage() {
  const set = P.images[P.chestOption];
  const views = [
    { label: "Front", img: set.front },
    { label: "Back", img: P.images.back },
  ];
  const lines = costLines();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <Link href="/merch" className="focus-ring text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground">
        ← All merch
      </Link>

      {/* Hero: views + order panel */}
      <section className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14" aria-labelledby="product-title">
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0">
          {views.map(({ label, img }, i) => (
            <figure key={label} className="w-[80%] shrink-0 snap-center sm:w-auto">
              <div className="overflow-hidden border border-border bg-[#ecece9]">
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  priority={i === 0}
                  sizes="(min-width:1024px) 32vw, (min-width:640px) 50vw, 80vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">{label}</figcaption>
            </figure>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="section-eyebrow">Pre-order · Limited first batch</p>
          <h1 id="product-title" className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {P.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-chrome">
            The changing robe we actually want on the boat between dives. A {P.base} in {P.colorway.toLowerCase()}, {waterproof} waterproof,
            with Dive Hard embroidered in white. Sold at cost.
          </p>

          <div className="mt-8 flex items-baseline gap-3">
            <p className="font-display text-3xl font-bold">{price}</p>
            {provisional && <p className="text-xs uppercase tracking-[0.2em] text-muted">Provisional, at cost</p>}
          </div>
          <a href="#cost" className="focus-ring mt-1 inline-block text-sm text-chrome underline underline-offset-4 hover:text-foreground">
            See exactly what you&apos;re paying for
          </a>

          <ul className="mt-8 divide-y divide-border border-y border-border text-sm">
            <li className="flex justify-between gap-4 py-3"><span className="text-muted">Availability</span><span className="text-right text-chrome">Pre-order, not in stock</span></li>
            <li className="flex justify-between gap-4 py-3"><span className="text-muted">Ships</span><span className="text-right text-chrome">About {P.leadTimeWeeks} weeks after the batch is ordered</span></li>
            <li className="flex justify-between gap-4 py-3"><span className="text-muted">Delivery</span><span className="text-right text-chrome">{P.shipsTo}</span></li>
          </ul>

          <div className="mt-8 border border-border bg-card p-5 sm:p-6">
            <p className="text-sm font-semibold">Pre-orders open soon</p>
            <p className="mt-1 text-sm text-muted">Leave your email and we&apos;ll tell you the moment the first batch opens. No payment is taken now.</p>
            <div className="mt-4">
              <NewsletterForm source="dryrobe-preorder" cta="Notify me" compact />
            </div>
          </div>

          {P.showDraftNotice && (
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Design preview. Images are mockups of the planned embroidery, not photos of a finished robe. Details may change before the batch is made.
            </p>
          )}
        </div>
      </section>

      {/* Embroidery */}
      <section className="mt-24 border-t border-border pt-16" aria-labelledby="embroidery">
        <p className="section-eyebrow">The embroidery</p>
        <h2 id="embroidery" className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Their robe, our mark. Stitched in white.
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <figure>
            <div className="overflow-hidden border border-border">
              <Image src={P.images.backDetail.url} alt={P.images.backDetail.alt} width={P.images.backDetail.width} height={P.images.backDetail.height}
                sizes="(min-width:1024px) 34vw, 100vw" className="h-auto w-full" />
            </div>
            <figcaption className="mt-4 text-sm leading-relaxed text-chrome">
              <span className="font-semibold text-foreground">Back.</span> Dryrobe&apos;s own back logo stays on every robe. A small × and DIVEHARD sit directly beneath it.
            </figcaption>
          </figure>
          <figure>
            <div className="overflow-hidden border border-border">
              <Image src={set.chest.url} alt={set.chest.alt} width={set.chest.width} height={set.chest.height}
                sizes="(min-width:1024px) 34vw, 100vw" className="h-auto w-full" />
            </div>
            <figcaption className="mt-4 text-sm leading-relaxed text-chrome">
              <span className="font-semibold text-foreground">Chest.</span> {CHEST_COPY[P.chestOption]}
            </figcaption>
          </figure>
        </div>
        <p className="mt-8 text-sm text-muted">{P.thread}.</p>
      </section>

      {/* Specs */}
      <section className="mt-24 grid gap-10 border-t border-border pt-16 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="specs">
        <div>
          <p className="section-eyebrow">The robe</p>
          <h2 id="specs" className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">Built for cold surface intervals</h2>
        </div>
        <dl className="divide-y divide-border border-y border-border">
          {[{ label: "Waterproof", value: `${waterproof} rated` }, ...P.specs, { label: "Production", value: P.fulfilment }].map((s) => (
            <div key={s.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[10rem_1fr]">
              <dt className="text-muted">{s.label}</dt>
              <dd className="text-chrome">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Cost breakdown */}
      <section id="cost" className="mt-24 grid scroll-mt-24 gap-10 border-t border-border pt-16 lg:grid-cols-[1fr_1.4fr]" aria-labelledby="cost-title">
        <div>
          <p className="section-eyebrow">Open books</p>
          <h2 id="cost-title" className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">What you&apos;re paying for</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            We&apos;re not making money on this robe. The price is what one costs us, line by line.
            {provisional && " Numbers are provisional until the batch is invoiced. If they come in lower, the price goes down."}
          </p>
        </div>
        <div>
          <table className="w-full text-sm">
            <caption className="sr-only">Cost per robe, based on a batch of {P.pricing.batchSize}</caption>
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-[0.2em] text-muted">
                <th scope="col" className="pb-3 font-semibold">Per robe</th>
                <th scope="col" className="pb-3 text-right font-semibold">USD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lines.map((l) => (
                <tr key={l.label}>
                  <th scope="row" className="py-3 pr-4 text-left font-normal">
                    <span className="block text-foreground">{l.label}</span>
                    <span className="block text-xs text-muted">{l.detail}</span>
                  </th>
                  <td className="py-3 text-right tabular-nums text-chrome">{formatUsd(l.perRobe)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-foreground/60">
                <th scope="row" className="pt-4 text-left font-semibold">You pay{provisional ? " (provisional)" : ""}</th>
                <td className="pt-4 text-right font-display text-lg font-bold tabular-nums">{price}</td>
              </tr>
            </tfoot>
          </table>
          <p className="mt-4 text-xs text-muted">Based on a first batch of {P.pricing.batchSize} robes. Delivery to you is shown before you pay.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="mt-24 border-t border-border pt-16" aria-labelledby="how">
        <p className="section-eyebrow">How the first batch works</p>
        <h2 id="how" className="sr-only">How the first batch works</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            ["Get notified", "Join the list above. When pre-orders open, you reserve a robe in your size."],
            ["We place one order", `Once the batch is full we order it from Dryrobe. It's embroidered in the US.`],
            ["It ships to you", `About ${P.leadTimeWeeks} weeks after that order. ${P.shipsTo}.`],
          ].map(([t, d], i) => (
            <li key={t} className="border-t border-foreground/60 pt-4">
              <p className="font-display text-sm font-bold tabular-nums text-muted">0{i + 1}</p>
              <p className="mt-2 font-semibold">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
