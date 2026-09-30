"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HEROES,
  HERO_CROSSFADE_MS,
  HERO_INTERVAL_MS,
} from "@/lib/heroes";

/**
 * Auto-rotating full-bleed hero stills with opacity crossfade.
 * Decorative (aria-hidden). First slide gets priority; later slides mount
 * on demand so first paint stays light. Honors reduced-motion and pauses
 * when the tab is hidden.
 */
export function HeroBackground() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  /** Indices that have entered the rotation (stay mounted for smooth fades). */
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduceMotion(mq.matches);
    onMotion();
    mq.addEventListener("change", onMotion);
    return () => mq.removeEventListener("change", onMotion);
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const active = reduceMotion ? 0 : index;

  useEffect(() => {
    setMounted((prev) => {
      const next = new Set(prev);
      next.add(active);
      if (!reduceMotion) next.add((active + 1) % HEROES.length);
      return next;
    });
  }, [active, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || HEROES.length <= 1 || !tabVisible) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HEROES.length);
    }, HERO_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, tabVisible]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {HEROES.map((hero, i) => {
        if (!mounted.has(i)) return null;
        const isActive = i === active;
        return (
          <Image
            key={hero.src}
            src={hero.src}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            unoptimized
            className="object-cover object-center"
            style={{
              opacity: isActive ? 1 : 0,
              transitionProperty: "opacity",
              transitionDuration: reduceMotion
                ? "0ms"
                : `${HERO_CROSSFADE_MS}ms`,
              transitionTimingFunction: "ease",
            }}
          />
        );
      })}

      {/* Scrim stack for WCAG-ish white type over underwater frames */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/50" />
    </div>
  );
}
