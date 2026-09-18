import Link from "next/link";

type Props = {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "text-lg sm:text-xl",
  md: "text-xl sm:text-2xl",
  lg: "text-3xl sm:text-4xl",
};

export function Wordmark({ className = "", href = "/", size = "md" }: Props) {
  const content = (
    <span className={`inline-flex items-center ${className}`}>
      {/* Clean geometric wordmark; PNG at /brand/logo-dive-hard.png is brand reference/fallback */}
      <span className={`wordmark text-foreground ${sizes[size]}`}>DIVE HARD.</span>
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="focus-ring rounded-sm transition-opacity hover:opacity-90" aria-label="Dive Hard home">
      {content}
    </Link>
  );
}
