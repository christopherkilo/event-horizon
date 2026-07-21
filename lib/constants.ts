export const SITE = {
  name: "Event Horizon",
  tagline: "Discover what’s next in your city",
  description:
    "Event Horizon is a modern discovery platform for concerts, conferences, markets, and nights out—curated with clarity and speed.",
  copyright: `© ${new Date().getFullYear()} Event Horizon. All rights reserved.`,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
] as const;
