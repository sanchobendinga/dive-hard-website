import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo size="sm" />
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
              <Link href="/join" className="focus-ring hover:text-foreground">
                Join
              </Link>
            </li>
            <li>
              <Link href="/merch" className="focus-ring hover:text-foreground">
                Merch
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
        <div className="mx-auto flex max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          <p>
            © {new Date().getFullYear()} Dive Hard · {SITE.creator}
          </p>
        </div>
      </div>
    </footer>
  );
}
