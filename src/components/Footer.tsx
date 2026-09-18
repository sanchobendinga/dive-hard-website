import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Wordmark size="sm" />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Underwater cinema by {SITE.creator}. Small group expeditions, workshops, and the films that come with them.
          </p>
        </div>

        <div>
          <p className="section-eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-chrome">
            <li>
              <Link href="/#watch" className="focus-ring hover:text-foreground">
                Watch
              </Link>
            </li>
            <li>
              <Link href="/merch" className="focus-ring hover:text-foreground">
                Merch
              </Link>
            </li>
            <li>
              <Link href="/join" className="focus-ring hover:text-foreground">
                Newsletter
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="section-eyebrow mb-4">Connect</p>
          <ul className="space-y-2 text-sm text-chrome">
            <li>
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring hover:text-foreground"
              >
                YouTube {SITE.youtubeHandle}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring hover:text-foreground"
              >
                Instagram {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="focus-ring hover:text-foreground">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Dive Hard · {SITE.creator}</p>
          <p>Photography-led. Not a tourist dive shop.</p>
        </div>
      </div>
    </footer>
  );
}
