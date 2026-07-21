import { Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
        <Compass className="size-6" aria-hidden />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        Off the map
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold">This event isn’t on the horizon</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        The page may have moved, or the event is no longer in this collection.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/browse">Browse events</Button>
        <Button href="/" variant="outline">Go home</Button>
      </div>
    </div>
  );
}
