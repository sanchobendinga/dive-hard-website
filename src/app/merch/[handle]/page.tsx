import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/merch/ProductGallery";
import { ProductPurchase } from "@/components/merch/ProductPurchase";
import { getMerchProvider } from "@/lib/merch";
import { DRYROBE_COLLAB } from "@/lib/merch/dryrobe-collab";

const DEDICATED = new Set<string>([DRYROBE_COLLAB.handle]);

export async function generateStaticParams() {
  const products = await getMerchProvider().getProducts();
  // Products with a dedicated static route are rendered there, not here.
  return products.filter((p) => !DEDICATED.has(p.handle)).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/merch/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const p = await getMerchProvider().getProduct(handle);
  return p ? { title: p.title, description: p.description } : { title: "Merch" };
}

export default async function ProductPage({ params }: PageProps<"/merch/[handle]">) {
  const { handle } = await params;
  const product = await getMerchProvider().getProduct(handle);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Link href="/merch" className="focus-ring text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground">← All merch</Link>
      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} />
        <div>
          <p className="section-eyebrow">{product.category} · {product.vendor}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{product.title}</h1>
          <div className="mt-5"><ProductPurchase product={product} /></div>
          <p className="mt-10 text-base leading-relaxed text-chrome">{product.description}</p>
          {product.specs.length > 0 && (
            <dl className="mt-10 divide-y divide-border border-y border-border">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="text-chrome">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {product.status === "draft" && (
            <div className="mt-10 border border-border p-4 text-xs text-muted">
              <p className="font-semibold uppercase tracking-[0.2em] text-chrome">Draft listing</p>
              <p className="mt-2">Placeholder brand/retailer photography. Not for sale.</p>
              {product.notes && <ul className="mt-2 list-disc space-y-1 pl-4">{product.notes.map((n) => <li key={n}>{n}</li>)}</ul>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
