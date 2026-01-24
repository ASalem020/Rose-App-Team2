import React from 'react';
import ProductCardSkeleton from './product-card-skeleton';

export default function BestSellingSkeleton() {
  return (
    <div
      className="grid animate-pulse grid-cols-1 items-start gap-8 bg-white md:grid-cols-4"
      aria-hidden
    >
      {/* left content skeleton */}
      <div className="col-span-1 space-y-4 p-3">
        <div className="h-6 w-40 rounded bg-zinc-200" />
        <div className="h-10 w-full rounded bg-zinc-200" />
        <div className="h-24 w-full rounded bg-zinc-200" />
        <div className="h-10 w-40 rounded bg-zinc-200" />
      </div>

      {/* right carousel skeleton */}
      <div className="col-span-3 grid grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
          >
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
