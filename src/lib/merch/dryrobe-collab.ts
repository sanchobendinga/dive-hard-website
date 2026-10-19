import type { MerchImage, Money } from "./types";

/**
 * Dive Hard Dryrobe: single source of truth for the dedicated product page (/merch/dive-hard-dryrobe).
 * Edit the values in DRYROBE_COLLAB only; everything on the page is derived from them.
 *
 * Status: DRAFT. Co-branding not yet approved by Dryrobe, chest option not chosen, price provisional.
 */

export type ChestOption = "F1" | "F2";

export type CostLine = {
  label: string;
  detail: string;
  /** Per-robe USD amount (decimal). */
  perRobe: number;
};

/** Preview-only override so F1 and F2 can be deployed side by side (build env DRYROBE_CHEST_OPTION=F2). The config value below is the default. */
function chestOverride(): ChestOption | undefined {
  const v = process.env.DRYROBE_CHEST_OPTION;
  return v === "F1" || v === "F2" ? v : undefined;
}

export const DRYROBE_COLLAB = {
  handle: "dive-hard-dryrobe",

  /** Product title. Switch to "dryrobe × DIVEHARD" only once Dryrobe approves co-branding. */
  title: "Dive Hard Dryrobe Advance",

  /** Front artwork. "F1" = DIVEHARD on the wearer's right chest. "F2" = × DIVEHARD stacked under Dryrobe's chest logo. Swaps every image. */
  chestOption: chestOverride() ?? ("F1" as ChestOption),

  /** Show the "draft / design preview" banner (turn off once final photography is in). */
  showDraftNotice: true,

  base: "Dryrobe Advance Long Sleeve",
  waterproofMm: 25000,
  colorway: "Black",
  thread: "White embroidery thread (Pantone 11-0601 TCX)",

  /** Pre-order logistics. Never presented as in stock. */
  leadTimeWeeks: 4,
  shipsTo: "US only at launch",
  fulfilment: "US stock, embroidered in the US",

  /** Honest cost breakdown. Total is derived from the components (no hard-coded total). */
  pricing: {
    currencyCode: "USD",
    /** Shown as provisional until the order is invoiced. */
    provisional: true,
    /** Robes in the first batch; the one-off setup fee is split across this many. */
    batchSize: 5,
    wholesaleRobe: 132, // 40% off $220 US list
    embroideryPerRobe: 45,
    setupFeeTotal: 75, // one-off, split across batchSize
    inboundShippingPerRobe: 0, // Dryrobe to us; treated as $0 until invoiced
    markup: 0,
  },

  /** Short, confirmed-or-sourced specs. Waterproof comes from waterproofMm. */
  specs: [
    { label: "Base robe", value: "Dryrobe Advance Long Sleeve" },
    { label: "Lining", value: "Recycled synthetic lambswool" },
    { label: "Fit", value: "Unisex, oversized for changing under. Size by height" },
    { label: "Guarantee", value: "Dryrobe 3-year Performance Guarantee" },
  ],

  /** Image sets. The page shows images[chestOption]; the back view is shared. */
  images: {
    F1: {
      front: { url: "/merch/dryrobe-collab/front-F1.webp", alt: "Front of the black robe: DIVEHARD in white embroidery on the wearer's right chest, dryrobe logo on the left", width: 1200, height: 1919, fit: "contain", matte: "#ecece9" },
      chest: { url: "/merch/dryrobe-collab/chest-F1.webp", alt: "Chest close-up: DIVEHARD embroidered on the wearer's right, dryrobe logo on the left of the zip", width: 1600, height: 633 },
    },
    F2: {
      front: { url: "/merch/dryrobe-collab/front-F2.webp", alt: "Front of the black robe: × DIVEHARD in white embroidery stacked under the dryrobe chest logo", width: 1200, height: 1919, fit: "contain", matte: "#ecece9" },
      chest: { url: "/merch/dryrobe-collab/chest-F2-side.webp", alt: "Chest close-up: × DIVEHARD embroidered directly under the dryrobe chest logo", width: 1250, height: 850 },
    },
    back: { url: "/merch/dryrobe-collab/back-B2.webp", alt: "Back of the black robe: dryrobe logo, with a small × and DIVEHARD embroidered in white beneath it", width: 1200, height: 1919 },
    backDetail: { url: "/merch/dryrobe-collab/back-detail-B2.webp", alt: "Back close-up: dryrobe logo, × and DIVEHARD in white embroidery", width: 1400, height: 954 },
  } satisfies Record<ChestOption, { front: MerchImage; chest: MerchImage }> & { back: MerchImage; backDetail: MerchImage },
} as const;

export const CHEST_COPY: Record<ChestOption, string> = {
  F1: "DIVEHARD on the right chest, mirroring Dryrobe's chest logo across the zip.",
  F2: "A small × DIVEHARD stacked directly under Dryrobe's chest logo.",
};

export function costLines(p = DRYROBE_COLLAB.pricing): CostLine[] {
  return [
    { label: "The robe", detail: "Dryrobe Advance Long Sleeve, at wholesale", perRobe: p.wholesaleRobe },
    { label: "Embroidery", detail: "Back and chest, white thread, done in the US", perRobe: p.embroideryPerRobe },
    { label: "Setup", detail: `One-off $${p.setupFeeTotal} setup fee, split across ${p.batchSize} robes`, perRobe: p.setupFeeTotal / p.batchSize },
    { label: "Shipping to us", detail: "Dryrobe to us. $0 until it's invoiced", perRobe: p.inboundShippingPerRobe },
    { label: "Dive Hard markup", detail: "None", perRobe: p.markup },
  ];
}

export function totalPerRobe(p = DRYROBE_COLLAB.pricing): number {
  return Math.round(costLines(p).reduce((s, l) => s + l.perRobe, 0) * 100) / 100;
}

export function priceMoney(): Money {
  return { amount: totalPerRobe().toFixed(2), currencyCode: DRYROBE_COLLAB.pricing.currencyCode };
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
}

export function formatMm(n: number): string {
  return `${new Intl.NumberFormat("en-US").format(n)} mm`;
}
