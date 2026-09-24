import Image from "next/image";
import Link from "next/link";

/** Natural logo aspect: 2953×425 ≈ 6.948:1 — never stretch. */
const LOGO_ASPECT = 2953 / 425;

type Props = {
  className?: string;
  href?: string | null;
  /** Invert near-black mark so it reads on dark backgrounds */
  invert?: boolean;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

/** Height in px; width derived from natural aspect for next/image only. */
const sizes = {
  sm: { height: 28, className: "h-6 w-auto sm:h-7" },
  md: { height: 36, className: "h-8 w-auto sm:h-9" },
  lg: { height: 56, className: "h-10 w-auto sm:h-14" },
} as const;

export function Logo({
  className = "",
  href = "/",
  invert = true,
  size = "md",
  priority = false,
}: Props) {
  const s = sizes[size];
  const width = Math.round(s.height * LOGO_ASPECT);

  const img = (
    <Image
      src="/brand/logo-dive-hard.svg"
      alt="Dive Hard"
      width={width}
      height={s.height}
      priority={priority}
      unoptimized
      className={`${s.className} ${invert ? "invert" : ""} ${className}`.trim()}
    />
  );

  if (href === null || href === "") return img;

  return (
    <Link
      href={href}
      className="focus-ring inline-flex items-center rounded-sm transition-opacity hover:opacity-80"
      aria-label="Dive Hard home"
    >
      {img}
    </Link>
  );
}
