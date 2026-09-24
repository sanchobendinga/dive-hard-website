import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  href?: string | null;
  /** Invert near-black PNG so it reads on dark backgrounds */
  invert?: boolean;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizes = {
  sm: { width: 120, height: 28, className: "h-6 w-auto sm:h-7" },
  md: { width: 160, height: 36, className: "h-8 w-auto sm:h-9" },
  lg: { width: 280, height: 64, className: "h-12 w-auto sm:h-16" },
};

export function Logo({
  className = "",
  href = "/",
  invert = true,
  size = "md",
  priority = false,
}: Props) {
  const s = sizes[size];
  const img = (
    <Image
      src="/brand/logo-dive-hard.png"
      alt="Dive Hard"
      width={s.width}
      height={s.height}
      priority={priority}
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
