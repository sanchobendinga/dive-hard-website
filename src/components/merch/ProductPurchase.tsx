"use client";
import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/merch/money";
import type { Product } from "@/lib/merch/types";

/** Variant pickers + price. Add to cart is intentionally disabled: no cart, checkout or payments yet. */
export function ProductPurchase({ product }: { product: Product }) {
  const [sel, setSel] = useState<Record<string, string>>(
    () => Object.fromEntries(product.options.map((o) => [o.name, o.values[0]])));
  const variant = useMemo(() => product.variants.find((v) =>
    v.selectedOptions.every((o) => sel[o.name] === o.value)), [product.variants, sel]);
  const price = variant?.price ?? product.priceRange.min;

  return (
    <div>
      <p className="text-xl text-chrome">{formatMoney(price)}</p>
      <div className="mt-8 space-y-6">
        {product.options.map((o) => (
          <fieldset key={o.name}>
            <legend className="section-eyebrow mb-3">{o.name}</legend>
            <div className="flex flex-wrap gap-2">
              {o.values.map((v) => {
                const on = sel[o.name] === v;
                return (
                  <button key={v} type="button" aria-pressed={on} onClick={() => setSel((s) => ({ ...s, [o.name]: v }))}
                    className={`focus-ring border px-4 py-2 text-sm transition ${on ? "border-foreground bg-foreground text-background" : "border-border text-chrome hover:border-chrome"}`}>
                    {v}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <button type="button" disabled aria-disabled="true"
        className="mt-10 w-full cursor-not-allowed border border-border bg-card px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        Coming soon
      </button>
      <p className="mt-3 text-xs text-muted">Add to cart opens when the Dive Hard store launches.</p>
    </div>
  );
}
