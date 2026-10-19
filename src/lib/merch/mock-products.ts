import { DRYROBE_COLLAB, formatMm, priceMoney } from "./dryrobe-collab";
import type { MerchImage, Money, Product, ProductOption, ProductVariant } from "./types";

/**
 * DRAFT mock catalogue. Specs/prices come only from /workspace/research/{robes,yeti,tees}.md.
 * Anything not in the research is null/TBD. Gill/Frostfire photos are brand/retailer images used as
 * placeholders only; the Dive Hard Dryrobe uses mockups only (no Dryrobe photos); replace with licensed or own photography before launch.
 */
const usd = (amount: string | null): Money => ({ amount, currencyCode: "USD" });
const TBD = "TBD";

const placeholder = (alt: string): MerchImage => ({
  url: "/merch/placeholder.svg", alt, width: 1200, height: 1200, placeholder: true,
});
const img = (file: string, alt: string, width: number, height: number): MerchImage => ({
  url: `/merch/${file}.webp`, alt, width, height,
});

function variantsFrom(handle: string, options: ProductOption[], priceFor: (sel: Record<string, string>) => Money): ProductVariant[] {
  const combos = options.reduce<Record<string, string>[]>(
    (acc, o) => acc.flatMap((c) => o.values.map((v) => ({ ...c, [o.name]: v }))), [{}]);
  return combos.map((sel, i) => ({
    id: `mock-${handle}-${i}`,
    title: Object.values(sel).join(" / "),
    availableForSale: false,
    price: priceFor(sel),
    selectedOptions: Object.entries(sel).map(([name, value]) => ({ name, value })),
  }));
}

function product(p: Omit<Product, "id" | "status" | "priceRange" | "variants"> & { priceFor: (sel: Record<string, string>) => Money }): Product {
  const { priceFor, ...rest } = p;
  const variants = variantsFrom(p.handle, p.options, priceFor);
  const priced = variants.map((v) => v.price).filter((m) => m.amount !== null)
    .sort((a, b) => Number(a.amount) - Number(b.amount));
  return {
    ...rest, id: `mock-${p.handle}`, status: "draft", variants,
    priceRange: { min: priced[0] ?? usd(null), max: priced.at(-1) ?? usd(null) },
  };
}

/** Size/colour runs are not in the research files, so they are TBD option values. */
const sizeTBD: ProductOption = { name: "Size", values: [`${TBD} (size run not confirmed)`] };
const colorTBD: ProductOption = { name: "Color", values: [`${TBD} (colors not confirmed)`] };

export const MOCK_PRODUCTS: Product[] = [
  product({
    // Dedicated page: /merch/dive-hard-dryrobe (config in ./dryrobe-collab.ts). This entry feeds the /merch grid.
    handle: DRYROBE_COLLAB.handle,
    title: DRYROBE_COLLAB.title,
    vendor: "dryrobe",
    category: "Robes",
    description: `${DRYROBE_COLLAB.base} with white Dive Hard embroidery. ${formatMm(DRYROBE_COLLAB.waterproofMm)} waterproof. Limited first batch, pre-order at cost.`,
    options: [sizeTBD],
    priceFor: () => priceMoney(),
    images: [DRYROBE_COLLAB.images[DRYROBE_COLLAB.chestOption].front],
    specs: [
      { label: "Waterproof", value: formatMm(DRYROBE_COLLAB.waterproofMm), source: "Dryrobe (email)" },
      ...DRYROBE_COLLAB.specs,
    ],
    notes: ["Mockup imagery (Desi). Co-branding, chest option (F1/F2) and price still provisional."],
  }),
  product({
    handle: "gill-aqua-parka",
    title: "Gill Aqua Parka",
    vendor: "Gill",
    category: "Robes",
    description: "Waterproof changing robe with welded seams and a high-loft fleece lining. Falls below the knee. Co-branding via Gill's \"Your Logo. Our Kit\" teamwear programme (pending).",
    options: [sizeTBD, colorTBD],
    priceFor: () => usd("225.00"),
    images: [
      img("gill-aqua-parka-1", "Gill Aqua Parka, product view", 1600, 1600),
      img("gill-aqua-parka-2", "Gill Aqua Parka, lifestyle view", 1600, 1600),
    ],
    specs: [
      { label: "Waterproof", value: "30,000 mm, welded seams", source: "robes.md [18]" },
      { label: "Lining", value: "High-loft fleece", source: "robes.md [17]" },
      { label: "Length", value: "Below the knee (5'11\" reviewer)", source: "robes.md [17]" },
      { label: "Weight", value: TBD },
      { label: "Fit note", value: "Unusual sizing; limited colours", source: "robes.md [19]" },
    ],
    notes: ["$225 is Gill North America's US price; ships from Atlanta, GA (no import duty if bought from Gill USA)."],
  }),
  product({
    handle: "frostfire-moonwrap-pro",
    title: "Frostfire Moonwrap Pro",
    vendor: "Frostfire",
    category: "Robes",
    description: "Lighter long-sleeve changing robe with a Shahtoosh fleece lining and a lifetime waterproof guarantee. Backup robe option.",
    options: [sizeTBD, colorTBD],
    priceFor: () => usd(null),
    images: [
      img("frostfire-moonwrap-pro-1", "Frostfire Moonwrap Pro, product view", 1600, 1536),
      img("frostfire-moonwrap-pro-2", "Frostfire Moonwrap Pro, lifestyle view", 1080, 1080),
    ],
    specs: [
      { label: "Waterproof", value: "20,000 mm, breathable", source: "robes.md [10]" },
      { label: "Lining", value: "Shahtoosh fleece", source: "robes.md [10]" },
      { label: "Weight", value: "~1 kg", source: "robes.md [11]" },
      { label: "Guarantee", value: "Lifetime waterproof guarantee", source: "robes.md [10]" },
    ],
    notes: ["Backup robe. Research price is £119.99 (UK); no USD retail found, so price is TBD.", "Unbranded Moonwrap Original blanks exist for own-logo orders; MOQ unknown."],
  }),
  product({
    handle: "yeti-rambler-bottle",
    title: "YETI Rambler Bottle with Chug Cap",
    vendor: "YETI",
    category: "Drinkware",
    description: "Insulated stainless bottle for the boat. Best cold retention in a head-to-head test. Dive Hard logo via YETI Corporate Sales (pending written approval for retail resale).",
    options: [{ name: "Capacity", values: ["26 oz", "36 oz"] }, colorTBD],
    priceFor: (sel) => usd(sel.Capacity === "26 oz" ? "40.00" : "50.00"),
    images: [placeholder("YETI Rambler bottle, photo coming soon")],
    specs: [
      { label: "Capacity", value: "26 oz (0.77 L) / 36 oz (1.06 L)", source: "yeti.md" },
      { label: "Cold retention", value: "55.4°F after 24 h (test)", source: "yeti.md [8]" },
      { label: "Hot retention", value: "116.1°F at 6 h (test)", source: "yeti.md [8]" },
      { label: "Build", value: "Kitchen-grade stainless; dishwasher-safe after customising", source: "yeti.md [4][9]" },
    ],
    notes: ["Prices are YETI US corporate catalogue list prices (26 oz $40, 36 oz $50).", "Research flags Chug Cap thread issues; consider Magdock/straw cap.", "YETI must confirm in writing that Dive Hard may resell logo bottles at retail."],
  }),
  product({
    handle: "comfort-colors-1717-tee",
    title: "Dive Hard Heavyweight Tee (Comfort Colors 1717)",
    vendor: "Comfort Colors",
    category: "Tees",
    description: "Heavyweight garment-dyed cotton tee with a boxy vintage dive-shop feel that softens with wear.",
    options: [sizeTBD, colorTBD],
    priceFor: () => usd(null),
    images: [placeholder("Comfort Colors 1717 tee, photo coming soon")],
    specs: [
      { label: "Fabric", value: "6.1 oz garment-dyed ring-spun cotton", source: "tees.md [1][2]" },
      { label: "Fit", value: "Boxy, vintage", source: "tees.md [1][2]" },
      { label: "Care", value: "Pre-shrunk", source: "tees.md [3][4]" },
      { label: "UPF", value: "None claimed", source: "tees.md" },
      { label: "Decoration", value: "Screen print / DTG", source: "tees.md [2]" },
    ],
    notes: ["Order samples first (recent batch inconsistency reported)."],
  }),
  product({
    handle: "upf-50-sun-tee",
    title: "Dive Hard UPF 50 Boat Tee",
    vendor: "TBD (Sport-Tek ST420 or Paragon SM0200)",
    category: "Tees",
    description: "Lightweight polyester sun tee for the boat. Blank not yet chosen: Sport-Tek ST420 for screen-printed logos, or Paragon SM0200 for all-over graphics.",
    options: [sizeTBD, colorTBD],
    priceFor: () => usd(null),
    images: [placeholder("UPF 50 tee, photo coming soon")],
    specs: [
      { label: "UPF", value: "UPF 50 (ST420) / UPF 50+ (SM0200)", source: "tees.md [8][9]" },
      { label: "Fabric", value: "4 oz 100% polyester (ST420) / 3.5 oz microfibre polyester (SM0200)", source: "tees.md [8][9]" },
      { label: "Decoration", value: "Screen print (ST420) / sublimation or DTF (SM0200)", source: "tees.md [8][9]" },
    ],
    notes: ["Blank choice pending Kabir."],
  }),
];
