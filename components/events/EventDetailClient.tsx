"use client";

import { Heart, Share2, Ticket } from "lucide-react";
import { useState } from "react";
import type { EventItem } from "@/lib/eventData";
import { formatEventDate, formatEventTime, cn } from "@/lib/utils";
import { ImageGallery } from "@/components/events/ImageGallery";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/contexts/ToastContext";

export function EventDetailClient({ event }: { event: EventItem }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const [ticketOpen, setTicketOpen] = useState(false);
  const liked = isFavorite(event.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <ImageGallery images={event.gallery} alt={event.title} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {event.category}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {event.title}
          </h1>
          <p className="mt-4 text-muted">{event.longDescription}</p>

          <dl className="mt-6 space-y-3 rounded-2xl border border-border bg-surface p-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">When</dt>
              <dd className="text-right font-medium">
                {formatEventDate(event.date)} · {formatEventTime(event.date)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Where</dt>
              <dd className="text-right font-medium">
                {event.venue}
                <br />
                {event.location}, {event.city}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Organizer</dt>
              <dd className="font-medium">{event.organizer}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Price</dt>
              <dd className="font-semibold text-accent">{event.price}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Attending</dt>
              <dd className="font-medium">
                {event.attendees.toLocaleString()} people
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setTicketOpen(true)}>
              <Ticket className="size-4" aria-hidden />
              Get tickets
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toggleFavorite(event.id);
                toast(
                  liked
                    ? "Removed from favorites"
                    : "Saved to favorites",
                );
              }}
              aria-pressed={liked}
            >
              <Heart
                className={cn("size-4", liked && "fill-current text-warm")}
                aria-hidden
              />
              {liked ? "Favorited" : "Favorite"}
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                const url = window.location.href;
                try {
                  await navigator.clipboard.writeText(url);
                  toast("Link copied to clipboard");
                } catch {
                  toast("Unable to copy link");
                }
              }}
            >
              <Share2 className="size-4" aria-hidden />
              Share
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={ticketOpen}
        onClose={() => setTicketOpen(false)}
        title="Tickets (placeholder)"
      >
        <p className="text-sm text-muted">
          This is a demo checkout modal for {event.title}. Connect Stripe or your
          ticketing provider later.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setTicketOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setTicketOpen(false);
              toast("Placeholder ticket reserved");
            }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}
