import Link from "next/link";

/** Natural aspect ≈ 6.95:1 — size by height only; never stretch. */
const ASPECT = "2953 / 425";

type Props = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg" | "hero";
};

/** Height-driven sizes; width follows aspect-ratio. */
const sizeClass: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-5 sm:h-6",
  md: "h-7 sm:h-8",
  lg: "h-10 sm:h-12",
  hero: "h-10 sm:h-12 md:h-14",
};

/**
 * Renders Kabir's PNG wordmark as white letterforms on transparent.
 * Uses CSS mask (not SVG potrace, not filter:invert) so counters stay open
 * and no white plate can appear behind DIVE.
 */
export function Logo({ className = "", href = "/", size = "md" }: Props) {
  const mark = (
    <span
      role={href ? undefined : "img"}
      aria-label={href ? undefined : "Dive Hard"}
      aria-hidden={href ? true : undefined}
      className={`block bg-white ${sizeClass[size]} ${className}`.trim()}
      style={{
        aspectRatio: ASPECT,
        width: "auto",
        maxWidth: size === "hero" ? "min(100%, 26rem)" : undefined,
        WebkitMaskImage: "url(/brand/logo-dive-hard.png)",
        maskImage: "url(/brand/logo-dive-hard.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );

  if (href === null || href === "") return mark;

  return (
    <Link
      href={href}
      className="focus-ring inline-flex items-center transition-opacity hover:opacity-80"
      aria-label="Dive Hard home"
    >
      {mark}
    </Link>
  );
}
