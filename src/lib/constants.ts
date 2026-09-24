export const SITE = {
  name: "Dive Hard",
  tagline: "Epic underwater cinema.",
  description:
    "Passionate UW filmmaker. Striving to make the most epic dive videos possible.",
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
    location: "Raja Ampat",
    year: "2024",
  },
  {
    id: "2V_DqhoQEj4",
    title: "Tubbataha 2024 4K",
    location: "Tubbataha",
    year: "2024",
  },
  {
    id: "Nta1ImiWHaI",
    title: "Socorro Dec 2025 8K",
    location: "Socorro",
    year: "2025",
  },
  {
    id: "VSbmOX4Vgh8",
    title: "Cocos 2025 8K",
    location: "Cocos",
    year: "2025",
  },
] as const;

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubeThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
