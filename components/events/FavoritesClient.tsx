"use client";

import { motion } from "framer-motion";
import { events } from "@/lib/eventData";
import { useFavorites } from "@/contexts/FavoritesContext";
import { EventCard } from "@/components/events/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { staggerContainer } from "@/lib/animation";

export function FavoritesClient() {
  const { favorites } = useFavorites();
  const liked = events.filter((event) => favorites.includes(event.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Favorites
      </h1>
      <p className="mt-2 text-sm text-muted">
        Saved locally in this browser — swap for an account later.
      </p>

      {liked.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No favorites yet"
            description="Tap the heart on any event card to save it here."
            actionHref="/browse"
            actionLabel="Browse events"
          />
        </div>
      ) : (
        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {liked.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
