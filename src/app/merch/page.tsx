import type { Metadata } from "next";
import { ProductCard } from "@/components/merch/ProductCard";
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
      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
