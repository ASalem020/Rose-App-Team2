import React from 'react';

export default function ProductItemSkeleton() {
  return (
    <div
      className="relative w-72 animate-pulse space-y-3 rounded-md bg-white p-3 shadow-md"
      aria-hidden
    >
      <div className="relative h-64 w-full overflow-hidden rounded-md bg-zinc-200" />

      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded bg-zinc-200" />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="h-3 w-3 rounded-full bg-zinc-200"
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="h-6 w-20 rounded bg-zinc-200" />
            <div className="h-4 w-12 rounded bg-zinc-200" />
          </div>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-200" />
      </div>

      <div className="absolute right-4 top-4 flex h-4 w-11 items-center justify-center rounded-lg bg-zinc-200" />
    </div>
  );
}
