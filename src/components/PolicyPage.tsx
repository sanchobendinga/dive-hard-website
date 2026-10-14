import type { ReactNode } from "react";

export function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
      <p className="border border-border px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-chrome">
        Draft, not legal advice. Fields in [BRACKETS] must be decided before launch.
      </p>
      <p className="section-eyebrow mt-10">Policies</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated: [DATE]</p>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-chrome [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </article>
  );
}

export const CONTACT = "divehardcreative@gmail.com";
