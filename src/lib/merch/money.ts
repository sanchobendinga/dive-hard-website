import type { Money } from "./types";

export function formatMoney(m: Money): string {
  if (m.amount === null) return "Price TBD";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: m.currencyCode }).format(Number(m.amount));
}
