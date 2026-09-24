import Image from "next/image";
import { youtubeThumb, youtubeWatchUrl } from "@/lib/constants";

type Props = {
  id: string;
  title: string;
  location: string;
  year: string;
};

export function VideoCard({ id, title, location, year }: Props) {
  return (
    <a
      href={youtubeWatchUrl(id)}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring group block overflow-hidden border border-border bg-card transition hover:border-foreground/40"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <Image
          src={youtubeThumb(id)}
          alt={`${title} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-[1.02] group-hover:grayscale-0 sm:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/55 text-white backdrop-blur-sm transition group-hover:scale-105 group-hover:border-white group-hover:bg-black/70">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="sr-only">Play on YouTube</span>
          </span>
        </div>
      </div>
      <div className="space-y-1 px-4 py-4">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {location} · {year}
        </p>
        <h3 className="text-base font-semibold text-foreground sm:text-lg">{title}</h3>
      </div>
    </a>
  );
}
