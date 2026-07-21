"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Heart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/contexts/FavoritesContext";

const PORTFOLIO_CASE_STUDY = `${
  process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "http://localhost:3000"
}/projects/event-horizon`;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-[var(--nav-height)] border-b transition-colors",
          scrolled
            ? "border-border bg-bg/85 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            <span className="text-accent">Event</span> Horizon
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:bg-white/5 hover:text-ink",
                  )}
                >
                  {link.label}
                  {link.href === "/favorites" && favorites.length > 0 ? (
                    <span className="ml-1.5 rounded-full bg-warm/20 px-1.5 py-0.5 text-[10px] text-warm">
                      {favorites.length}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PORTFOLIO_CASE_STUDY}
              className="hidden h-9 items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 text-sm font-semibold text-accent transition hover:border-accent/50 hover:bg-accent/15 sm:inline-flex"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Case study
            </a>
            <Button href="/browse" size="sm" className="hidden sm:inline-flex">
              Explore events
            </Button>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-bg/80"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              className="absolute inset-x-3 top-[calc(var(--nav-height)+0.5rem)] rounded-2xl border border-border bg-surface p-4"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted">{SITE.name}</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-border"
                >
                  <X className="size-4" />
                </button>
              </div>
              <ul className="space-y-1">
                <li>
                  <a
                    href={PORTFOLIO_CASE_STUDY}
                    className="flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/10 px-3 py-3 text-base font-medium text-accent"
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                    Back to portfolio case study
                  </a>
                </li>
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium hover:bg-white/5"
                    >
                      {link.href === "/favorites" ? (
                        <Heart className="size-4 text-warm" aria-hidden />
                      ) : null}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
