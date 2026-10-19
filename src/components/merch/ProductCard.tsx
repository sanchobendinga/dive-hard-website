import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "@/lib/merch/money";
import type { Product } from "@/lib/merch/types";

export function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  const { min, max } = product.priceRange;
  const price = min.amount && max.amount && min.amount !== max.amount
    ? `${formatMoney(min)} – ${formatMoney(max)}` : formatMoney(min);
  return (
    <Link href={`/merch/${product.handle}`} className="focus-ring group block">
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card" style={img?.matte ? { background: img.matte } : undefined}>
        {img && (
          <Image src={img.url} alt={img.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className={`${img.fit === "contain" ? "object-contain" : "object-cover"} grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0 ${img.placeholder ? "opacity-80" : ""}`} />
        )}
        {product.status === "draft" && (
          <span className="absolute left-3 top-3 border border-border bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-chrome">Draft</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{product.category}</p>
          <h2 className="mt-1 font-display text-base font-bold tracking-tight">{product.title}</h2>
        </div>
        <p className="shrink-0 text-sm text-chrome">{price}</p>
      </div>
    </Link>
  );
}
