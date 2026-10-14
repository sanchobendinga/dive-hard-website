"use client";
import Image from "next/image";
import { useState } from "react";
import type { MerchImage } from "@/lib/merch/types";

export function ProductGallery({ images }: { images: MerchImage[] }) {
  const [i, setI] = useState(0);
  const cur = images[i];
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
        {cur && <Image src={cur.url} alt={cur.alt} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((im, n) => (
            <button key={im.url} type="button" onClick={() => setI(n)} aria-label={`Show image ${n + 1}`} aria-current={n === i}
              className={`focus-ring relative aspect-square overflow-hidden border ${n === i ? "border-foreground" : "border-border opacity-60 hover:opacity-100"}`}>
              <Image src={im.url} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
