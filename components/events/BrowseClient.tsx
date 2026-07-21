"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  events,
  filterEvents,
  type EventFilters,
} from "@/lib/eventData";
import { SearchInput } from "@/components/ui/SearchInput";
import { FilterSidebar } from "@/components/events/FilterSidebar";
import { EventCard } from "@/components/events/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { EventGridSkeleton } from "@/components/ui/Skeleton";
import { staggerContainer } from "@/lib/animation";

export function BrowseClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<EventFilters>({
    query: searchParams.get("q") ?? "",
    category: "All",
    city: "All",
    date: "",
    sort: "date-asc",
  });

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setFilters((prev) => ({ ...prev, query: q }));
  }, [searchParams]);

  const results = useMemo(
    () => filterEvents(events, filters),
    [filters],
  );

  function handleSearchChange(value: string) {
    setFilters((prev) => ({ ...prev, query: value }));
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) params.set("q", value.trim());
    else params.delete("q");
    router.replace(`/browse${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <FilterSidebar filters={filters} onChange={setFilters} />

      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              Browse events
            </h1>
            <p className="mt-2 text-sm text-muted">
              {results.length} event{results.length === 1 ? "" : "s"} match your
              filters
            </p>
          </div>
          <SearchInput
            value={filters.query}
            onChange={handleSearchChange}
            className="w-full sm:max-w-sm"
            id="browse-search"
          />
        </div>

        {loading ? (
          <EventGridSkeleton />
        ) : results.length === 0 ? (
          <EmptyState
            title="No events found"
            description="Try clearing filters or searching a different keyword."
            actionHref="/browse"
            actionLabel="Reset browse"
          />
        ) : (
          <motion.div
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {results.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
