import type { Metadata } from "next";
import { FavoritesClient } from "@/components/events/FavoritesClient";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your saved events on Event Horizon.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
