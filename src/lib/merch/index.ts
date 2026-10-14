import { MOCK_PRODUCTS } from "./mock-products";
import { shopifyConfigured, shopifyProvider } from "./shopify";
import type { MerchProvider } from "./types";

export type * from "./types";

const mockProvider: MerchProvider = {
  name: "mock",
  async getProducts() { return MOCK_PRODUCTS; },
  async getProduct(handle) { return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null; },
};

/** Single entry point for pages. Shopify only when both env vars are present; otherwise mock. */
export function getMerchProvider(): MerchProvider {
  return shopifyConfigured() ? shopifyProvider : mockProvider;
}

export { formatMoney } from "./money";
