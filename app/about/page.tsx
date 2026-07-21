import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name} — a modern event discovery platform.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        About
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
        Built for discovering what’s next
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
        <p>{SITE.description}</p>
        <p>
          This is a production-quality frontend demo with searchable catalogs,
          filters, favorites, detail pages, and motion that stays out of the
          way. All content is placeholder so you can swap real venues and
          ticketing later.
        </p>
        <p>
          Designed as a SaaS-style product experience: fast browsing, clear
          hierarchy, and components ready to scale.
        </p>
      </div>
      <div className="mt-8">
        <Button href="/browse">Start browsing</Button>
      </div>
    </div>
  );
}
