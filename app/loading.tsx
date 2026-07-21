import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div
      className="mx-auto flex min-h-[55vh] max-w-6xl flex-col items-center justify-center px-4 text-center"
      role="status"
    >
      <div className="flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent">
        <LoaderCircle className="size-6 animate-spin" aria-hidden />
      </div>
      <p className="mt-4 font-display text-lg font-semibold">Finding what’s next</p>
      <p className="mt-1 text-sm text-muted">Preparing your Event Horizon experience…</p>
    </div>
  );
}
