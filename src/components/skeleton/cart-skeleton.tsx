import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartSkeleton() {
  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-end gap-2">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="mb-1 h-6 w-24" />
        </div>
        <Skeleton className="h-12 w-32 rounded-md" />
      </div>

      {/* Cart Items Box Skeleton */}
      <div className="mt-6 flex flex-col gap-4 rounded-xl border-2 border-zinc-200 p-5 dark:border-zinc-800">
        {[1, 2, 3].map(item => (
          <div
            key={item}
            className="flex h-40 flex-row gap-4 border-b border-b-zinc-200 pb-5 last:border-none dark:border-b-zinc-700"
          >
            {/* Image Skeleton */}
            <Skeleton className="h-full w-28 rounded-lg" />

            {/* Content Skeleton */}
            <div className="flex w-4/5 flex-1 flex-col justify-between">
              <div className="flex flex-row justify-between">
                <div className="flex flex-1 flex-col gap-3">
                  {/* Title */}
                  <Skeleton className="h-7 w-3/4 rounded-md" />
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-32 rounded-md" />
                  </div>
                </div>
                {/* Remove Button */}
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>

              <div className="flex flex-row items-end justify-between">
                {/* Price */}
                <Skeleton className="h-8 w-32 rounded-md" />

                {/* Quantity Controls */}
                <div className="flex flex-row gap-2">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <Skeleton className="h-12 w-24 rounded-md" />
                  <Skeleton className="h-12 w-12 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button Skeleton */}
      <Skeleton className="mt-8 h-12 w-52 rounded-md" />
    </div>
  );
}
