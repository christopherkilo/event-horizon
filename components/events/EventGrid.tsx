"use client";

import { motion } from "framer-motion";
import type { EventItem } from "@/lib/eventData";
import { EventCard } from "@/components/events/EventCard";
import { staggerContainer } from "@/lib/animation";

export function EventGrid({ events }: { events: EventItem[] }) {
  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </motion.div>
  );
}
