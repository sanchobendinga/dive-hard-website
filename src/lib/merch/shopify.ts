import type { MerchProvider, Product } from "./types";

/**
 * Shopify Storefront API adapter. Activated only when BOTH env vars are set:
 *   SHOPIFY_STORE_DOMAIN             e.g. dive-hard.myshopify.com
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN  public Storefront API token (Headless channel)
 * Optional: SHOPIFY_STOREFRONT_API_VERSION (default below).
 * Read-only: no cart/checkout mutations are wired yet.
 */
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-07";

export function shopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);
}

async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300, tags: ["shopify-products"] },
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (!res.ok || json.errors?.length) {
    throw new Error(`Shopify Storefront error: ${json.errors?.map((e) => e.message).join("; ") ?? res.status}`);
  }
  return json.data as T;
}

const PRODUCT_FIELDS = `
  id handle title vendor productType descriptionHtml description
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  options { name optionValues { name } }
  images(first: 10) { nodes { url altText width height } }
  variants(first: 100) { nodes { id title availableForSale price { amount currencyCode } selectedOptions { name value } } }
  specs: metafield(namespace: "custom", key: "specs") { value }
`;

type ShopifyProduct = {
  id: string; handle: string; title: string; vendor: string; productType: string; description: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string }; maxVariantPrice: { amount: string; currencyCode: string } };
  options: { name: string; optionValues: { name: string }[] }[];
  images: { nodes: { url: string; altText: string | null; width: number; height: number }[] };
  variants: { nodes: { id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; selectedOptions: { name: string; value: string }[] }[] };
  specs: { value: string } | null;
};

function toCategory(t: string): Product["category"] {
  if (/bottle|drink/i.test(t)) return "Drinkware";
  if (/tee|shirt/i.test(t)) return "Tees";
  return "Robes";
}

export function mapShopifyProduct(p: ShopifyProduct): Product {
  let specs: Product["specs"] = [];
  try { specs = p.specs ? JSON.parse(p.specs.value) : []; } catch { specs = []; }
  return {
    id: p.id, handle: p.handle, title: p.title, vendor: p.vendor, category: toCategory(p.productType),
    description: p.description, status: "active",
    priceRange: { min: p.priceRange.minVariantPrice, max: p.priceRange.maxVariantPrice },
    options: p.options.map((o) => ({ name: o.name, values: o.optionValues.map((v) => v.name) })),
    variants: p.variants.nodes,
    images: p.images.nodes.map((i) => ({ url: i.url, alt: i.altText ?? p.title, width: i.width, height: i.height })),
    specs,
  };
}

export const shopifyProvider: MerchProvider = {
  name: "shopify",
  async getProducts() {
    const d = await storefront<{ products: { nodes: ShopifyProduct[] } }>(
      `query { products(first: 50, sortKey: TITLE) { nodes { ${PRODUCT_FIELDS} } } }`);
    return d.products.nodes.map(mapShopifyProduct);
  },
  async getProduct(handle) {
    const d = await storefront<{ product: ShopifyProduct | null }>(
      `query($handle: String!) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`, { handle });
    return d.product ? mapShopifyProduct(d.product) : null;
  },
};
