import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/merch/ProductCard";
import { DRYROBE_COLLAB as DR, formatMm, formatUsd, totalPerRobe } from "@/lib/merch/dryrobe-collab";
import { getMerchProvider } from "@/lib/merch";

export const metadata: Metadata = {
  title: "Merch",
  description: "Dive Hard gear for cold surface intervals and long boat days.",
};

export default async function MerchPage() {
  const products = await getMerchProvider().getProducts();
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
      <p className="section-eyebrow">Merch</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Dive Hard gear</h1>
      <p className="mt-4 max-w-xl text-base text-muted">Robes, bottles and tees for cold surface intervals and long boat days. Store opening soon.</p>
      <Link href={`/merch/${DR.handle}`} className="focus-ring group mt-12 grid items-center gap-6 border border-border bg-card p-4 sm:grid-cols-[10rem_1fr_auto] sm:p-5">
        <div className="relative mx-auto aspect-[1200/1919] w-28 overflow-hidden sm:w-full" style={{ background: DR.images[DR.chestOption].front.matte }}>
          <Image src={DR.images[DR.chestOption].front.url} alt="" fill sizes="160px" className="object-contain" />
        </div>
        <div>
          <p className="section-eyebrow">Pre-order · Limited first batch</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">{DR.title}</h2>
          <p className="mt-2 max-w-md text-sm text-muted">{formatMm(DR.waterproofMm)} waterproof, white Dive Hard embroidery, sold at cost. {DR.shipsTo}.</p>
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-chrome group-hover:text-foreground">{formatUsd(totalPerRobe())} · View →</p>
      </Link>
      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
