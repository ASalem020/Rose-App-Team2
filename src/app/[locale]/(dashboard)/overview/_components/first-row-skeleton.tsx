import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function FirstRowSkeleton() {
  return (
    <section className="container my-6 me-6 ms-4 flex h-80 flex-row gap-6">
      {/* Left side: Overview Cards Skeleton */}
      <div className="w-5/12 rounded-2xl bg-white p-6 shadow-sm">
        <div className="grid h-full grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex h-32 flex-col rounded-xl bg-zinc-50 p-4"
            >
              <div className="flex flex-col gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Categories overview Skeleton */}
      <div className="flex h-80 flex-1 flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm">
        <Skeleton className="mb-2 h-8 w-48" />
        <div className="overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-row items-center justify-between border-b border-zinc-50 py-3 last:border-0"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
