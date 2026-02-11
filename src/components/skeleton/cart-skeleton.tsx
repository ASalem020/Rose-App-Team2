import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartSkeleton() {
  return (
    <div className="w-full lg:w-3/5">
      {/* Header Skeleton */}
      <div className="mb-8 flex flex-row items-center justify-between">
        <div className="flex items-end gap-2">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="mb-1 h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      {/* Cart Items Box Skeleton */}
      <div className="flex flex-col gap-4 rounded-xl border-2 border-zinc-200 p-5 dark:border-zinc-800">
        {[1, 2, 3].map(item => (
          <div
            key={item}
            className="flex h-40 flex-row gap-4 border-b border-b-zinc-200 pb-5 last:border-none dark:border-b-zinc-700"
          >
            {/* Image Skeleton */}
            <Skeleton className="h-full w-[117px] rounded-lg" />

            {/* Content Skeleton */}
            <div className="flex flex-1 flex-col justify-between py-1">
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>

              <div className="flex flex-row items-end justify-between">
                <Skeleton className="h-8 w-24" />
                <div className="flex flex-row gap-2">
                  <Skeleton className="size-12 rounded-md" />
                  <Skeleton className="h-12 w-24 rounded-md" />
                  <Skeleton className="size-12 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button Skeleton */}
      <Skeleton className="mt-8 h-10 w-52 rounded-md" />
    </div>
  );
}
