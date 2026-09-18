"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark } from "./Wordmark";

const nav = [
  { href: "/#watch", label: "Watch" },
  { href: "/#destinations", label: "Destinations" },
  { href: "/merch", label: "Merch" },
  { href: "/join", label: "Join" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Wordmark size="sm" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring text-sm font-medium text-chrome transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#newsletter"
            className="focus-ring rounded-full bg-teal px-4 py-2 text-sm font-semibold text-navy-deep transition hover:bg-teal-bright"
          >
            Newsletter
          </Link>
        </nav>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-navy-deep px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring block rounded-md px-3 py-3 text-base text-chrome hover:bg-navy hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#newsletter"
                className="focus-ring mt-2 block rounded-full bg-teal px-3 py-3 text-center text-base font-semibold text-navy-deep"
                onClick={() => setOpen(false)}
              >
                Newsletter
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
