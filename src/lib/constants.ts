export const SITE = {
  name: "Dive Hard",
  tagline: "Epic underwater cinema.",
  description:
    "Passionate UW filmmaker running small group expeditions and workshops. Striving to make the most epic dive videos possible.",
  url: "https://divehard.film",
  email: "divehardcreative@gmail.com",
  youtube: "https://www.youtube.com/@DiveHard",
  youtubeHandle: "@DiveHard",
  instagram: "https://www.instagram.com/kabirteja/",
  instagramHandle: "@kabirteja",
  creator: "Kabir Teja",
} as const;

export const VIDEOS = [
  {
    id: "db4VJ0LFG0I",
    title: "Raja Ampat 2024 4K",
    destination: "Raja Ampat",
    year: "2024",
  },
  {
    id: "2V_DqhoQEj4",
    title: "Tubbataha 2024 4K",
    destination: "Tubbataha",
    year: "2024",
  },
  {
    id: "Nta1ImiWHaI",
    title: "Socorro Dec 2025 8K",
    destination: "Socorro",
    year: "2025",
  },
  {
    id: "VSbmOX4Vgh8",
    title: "Cocos 2025 8K",
    destination: "Cocos",
    year: "2025",
  },
] as const;

export const DESTINATIONS = [
  {
    name: "Socorro",
    region: "Mexico",
    blurb: "Giant mantas in open blue. Close passes, chrome light.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Raja Ampat",
    region: "Indonesia",
    blurb: "Peak biodiversity. Soft coral walls and soft morning light.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Cocos",
    region: "Costa Rica",
    blurb: "Hammerheads in schools. Pelagic energy, remote water.",
    image:
      "https://images.unsplash.com/photo-1582967788606-a171f1080ed4?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Tubbataha",
    region: "Philippines",
    blurb: "Park walls and clear water. Big reef, big skies.",
    image:
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export const MERCH = [
  {
    id: "tee",
    name: "Dive Hard Tee",
    price: "$38",
    blurb: "Heavyweight cotton. Wordmark on chest, spare and clean.",
  },
  {
    id: "hoodie",
    name: "Chrome Hoodie",
    price: "$68",
    blurb: "Soft fleece, navy chrome pull. Built for boat days and edit nights.",
  },
  {
    id: "sticker",
    name: "Period Sticker Pack",
    price: "$8",
    blurb: "Three vinyl stickers. DIVE HARD. — for tanks, lids, and laptops.",
  },
  {
    id: "cap",
    name: "Hard Cap",
    price: "$32",
    blurb: "Structured six-panel. Teal stitch detail on black.",
  },
] as const;

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
