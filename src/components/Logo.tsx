import Link from "next/link";

/** Natural aspect of the traced vector: 1695.67 × 245.5 (≈ 6.91:1). */
const W = 1695.67;
const H = 245.5;

type Props = {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg" | "hero";
};

/** Height-driven sizes; width follows intrinsic aspect (w-auto). */
const sizeClass: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-5 sm:h-6",
  md: "h-7 sm:h-8",
  lg: "h-10 sm:h-12",
  hero: "h-10 sm:h-12 md:h-14",
};

/** White vector wordmark (no period) on transparent. Never stretched. */
export function Logo({ className = "", href = "/", size = "md" }: Props) {
  const mark = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/divehard-logo-white.svg"
      width={W}
      height={H}
      alt={href ? "" : "Dive Hard"}
      aria-hidden={href ? true : undefined}
      draggable={false}
      className={`block w-auto max-w-full object-contain object-left ${sizeClass[size]} ${className}`.trim()}
      style={size === "hero" ? { maxWidth: "min(100%, 26rem)" } : undefined}
    />
  );

  if (href === null || href === "") return mark;

  return (
    <Link
      href={href}
      className="focus-ring inline-flex items-center transition-opacity hover:opacity-80"
      aria-label="Dive Hard"
    >
      {mark}
    </Link>
  );
}
