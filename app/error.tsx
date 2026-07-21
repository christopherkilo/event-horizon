"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-warm/25 bg-warm/10 text-warm">
        <AlertTriangle className="size-6" aria-hidden />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-warm">
        Brief interruption
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold">We lost the signal</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Something unexpected interrupted this view. Your browser-saved favorites are still safe.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="outline">Go home</Button>
      </div>
    </div>
  );
}
