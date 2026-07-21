"use client";

import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/shared/PageTransition";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ToastProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-on-accent"
          >
            Skip to content
          </a>
          <Navbar />
          <PageTransition>
            <main id="main" className="relative flex-1">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </ToastProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
