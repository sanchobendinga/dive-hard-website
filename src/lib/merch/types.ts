/** Provider-agnostic merch data model. Mock data and the Shopify adapter both map into this. */
export type Money = {
  /** Decimal string, e.g. "220.00". null = price not decided yet (shown as TBD). */
  amount: string | null;
  currencyCode: string;
};

export type MerchImage = { url: string; alt: string; width: number; height: number; placeholder?: boolean };

export type ProductOption = { name: string; values: string[] };

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
};

export type Spec = { label: string; value: string; source?: string };

export type Product = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  category: "Robes" | "Drinkware" | "Tees";
  description: string;
  status: "draft" | "active";
  priceRange: { min: Money; max: Money };
  options: ProductOption[];
  variants: ProductVariant[];
  images: MerchImage[];
  specs: Spec[];
  /** Internal notes surfaced on draft pages (sourcing, rights, missing data). */
  notes?: string[];
};

export interface MerchProvider {
  readonly name: "mock" | "shopify";
  getProducts(): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
}
