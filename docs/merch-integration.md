# Dive Hard merch: Shopify integration prep

Status: **scaffold on branch `merch-shopify`**. No Shopify store, credentials, cart, checkout or payments exist yet. `/merch` renders draft mock data.

## How the data layer works
- `src/lib/merch/types.ts`: provider-agnostic `Product`, `ProductVariant`, `Money`, `MerchProvider`.
- `src/lib/merch/mock-products.ts`: draft catalogue (specs only from `/workspace/research/*.md`, null price = "Price TBD").
- `src/lib/merch/shopify.ts`: Storefront API adapter (read-only GraphQL: `products`, `product(handle)`), maps to `Product`.
- `src/lib/merch/index.ts`: `getMerchProvider()` returns Shopify **only if both env vars are set**, else mock. Pages call only this.

## Env vars (Vercel project settings, Preview first)
| Var | Required | Notes |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | yes | `xxxx.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | yes | Public Storefront token from the **Headless** sales channel app |
| `SHOPIFY_STOREFRONT_API_VERSION` | no | default `2026-07`; bump to a supported version |

Product specs on Shopify: add a product metafield `custom.specs` (JSON: `[{"label":"Weight","value":"1.3 kg"}]`) and expose it to the Storefront API.

## Adapter shape
```ts
interface MerchProvider {
  name: "mock" | "shopify";
  getProducts(): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
}
```
Responses cached 5 min (`revalidate: 300`, tag `shopify-products`). Next steps when going live: add `cartCreate` / `cartLinesAdd` mutations and redirect to Shopify-hosted `checkoutUrl` (keeps PCI/payments on Shopify), enable the Add to cart button, plus a webhook → `revalidateTag("shopify-products")`.

## POD and 3PL plug in on the Shopify side (no site code)
- **Printful (POD, tees):** install the Printful app in Shopify admin, design products there, sync to Shopify. Printful receives orders automatically and fulfils. Products show up via the Storefront API like any other.
- **3PL (likely Shipmaster, unconfirmed):** install/connect their Shopify app or fulfilment service integration. Stocked items (robes, bottles) get assigned to the 3PL location; Shopify routes orders and syncs inventory/tracking.
- Mixed carts split fulfilment automatically by location; shipping policy already mentions split shipments.
- **Branded goods (Dryrobe, Gill, YETI) are NOT print-on-demand.** They need wholesale/dealer or custom-programme accounts, bulk orders (MOQ: dryrobe 5, YETI 20/product/color/logo per AU FAQ) and stock sent to the 3PL. YETI and DRYROBE impose resale/trademark restrictions; get written approval first.

## Checklist: what Kabir must provide
- [ ] Shopify account/plan + store (dev or trial is fine), staff access for the bot
- [ ] Headless channel installed → Storefront access token
- [ ] Domain decision (e.g. keep shop on divehard.film/merch; Shopify checkout on `shop.divehard.film`?)
- [ ] Logo files (vector SVG/AI/EPS) for print/embroidery
- [ ] Business entity, address, jurisdiction (policies + Shopify Payments)
- [ ] Return window, regions shipped, shipping rates, free-shipping threshold
- [ ] Final retail prices (Frostfire, both tees are TBD)
- [ ] Size runs and colors per product
- [ ] Tee blank choice for UPF tee (Sport-Tek ST420 vs Paragon SM0200)
- [ ] Written resale approval: YETI Corporate Sales, dryrobe stockist (orders@dryrobe.com), Gill teamwear
- [ ] 3PL confirmation (Shipmaster?) and Printful account
- [ ] Licensed or own product photography (current robe photos are brand/retailer images, placeholder only; YETI and tee photos missing)
- [ ] Legal review of the four policy drafts

## Dive Hard Dryrobe product page (`/merch/dive-hard-dryrobe`)
- All copy, numbers and images come from `src/lib/merch/dryrobe-collab.ts` (`DRYROBE_COLLAB`).
- `title`: default "Dive Hard Dryrobe Advance"; switch to "dryrobe × DIVEHARD" only after Dryrobe approves co-branding.
- `chestOption`: `"F1"` | `"F2"` swaps the front and chest images and copy. Preview builds can override it with build env `DRYROBE_CHEST_OPTION=F2`.
- `pricing`: `wholesaleRobe`, `embroideryPerRobe`, `setupFeeTotal` / `batchSize`, `inboundShippingPerRobe`, `markup`. The total is derived, never typed in. `provisional: true` labels it.
- `showDraftNotice`: draft banner + `noindex`. Turn off for launch.
- Images are clean web renders of Desi's mockups (`/workspace/robe-mockups/webbi-render/render_web.py`). No Dryrobe photography is used; the old Dryrobe retailer photos were removed.
- Order CTA is a newsletter signup (`source: "dryrobe-preorder"`). No cart or payment.
