export const SITE = {
  name: "Dive Hard",
  tagline: "a resource and community for hardcore divers",
  description:
    "Trip reports, small group expeditions and UW imaging workshops.",
  url: "https://divehard.film",
  email: "divehardcreative@gmail.com",
  youtube: "https://www.youtube.com/@DiveHard",
  youtubeHandle: "@DiveHard",
  youtubeChannelId: "UCyVmjcFrUrCUkQnJict2ijA",
  instagram: "https://www.instagram.com/kabirteja/",
  instagramHandle: "@kabirteja",
  creator: "Kabir Teja",
} as const;

/** Latest 6 uploads from YouTube RSS (newest first). Refresh periodically. */
export const VIDEOS = [
  {
    id: "Nta1ImiWHaI",
    title: "Diving Socorro in December 2025... (Shot in 8K)",
    published: "2026-04-26",
  },
  {
    id: "VSbmOX4Vgh8",
    title: "Diving Cocos Island in 2025... (Shot in 8K)",
    published: "2025-10-18",
  },
  {
    id: "vJgvjCFUDqQ",
    title: "Diving the Tiger Beach and Bimini in 2025… (4K)",
    published: "2025-08-03",
  },
  {
    id: "2V_DqhoQEj4",
    title: "Diving Tubbataha in 2024... (4K)",
    published: "2025-03-02",
  },
  {
    id: "db4VJ0LFG0I",
    title: "Diving Raja Ampat in 2024...(4K)",
    published: "2024-03-02",
  },
  {
    id: "TE7SR9CSYXo",
    title: "Diving Komodo and Alor in 2023... (4K)",
    published: "2023-10-06",
  },
] as const;

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
