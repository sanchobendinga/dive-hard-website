/**
 * Curated Toobi freeze-frame heroes for the home page (dark cinematic set).
 * Order interleaved for variety (jacks / sharks / crocs) — not chronological.
 */
export type HeroSlide = {
  src: string;
  alt: string;
};

export const HEROES: readonly HeroSlide[] = [
  {
    src: "/heroes/malpelo-jacks-v2-06.webp",
    alt: "Diver amid a dense school of jacks, Malpelo",
  },
  {
    src: "/heroes/tiger-bimini.webp",
    alt: "Diver surrounded by tiger sharks, Bimini",
  },
  {
    src: "/heroes/chinchorro-croc-profile.webp",
    alt: "American crocodile in profile over seagrass, Chinchorro",
  },
  {
    src: "/heroes/malpelo-jacks-v2-04.webp",
    alt: "Diver beside schooling jacks, Malpelo",
  },
  {
    src: "/heroes/emerald-sharks.webp",
    alt: "Shark encounter in deep blue water, Emerald",
  },
  {
    src: "/heroes/malpelo-jacks-v2-10.webp",
    alt: "Diver with jacks school, Malpelo",
  },
  {
    src: "/heroes/chinchorro-photographer-pole.webp",
    alt: "Underwater photographer with pole near crocodile, Chinchorro",
  },
  {
    src: "/heroes/malpelo-school-shark.webp",
    alt: "Shark cutting through a jack school, Malpelo",
  },
] as const;

export const HERO_INTERVAL_MS = 10_000;
export const HERO_CROSSFADE_MS = 1400;
