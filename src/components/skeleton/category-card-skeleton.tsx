import React from 'react';

export default function CategoryCardSkeleton() {
  return (
    <div className="w-fill flex h-8 animate-pulse items-center overflow-hidden rounded-md bg-zinc-200">
      {/*  category image skeleton */}
      <div className="flex h-12 w-10 items-center justify-center bg-zinc-300 p-2" />

      {/* category name skeleton */}
      <div className="ml-3 h-4 flex-1 rounded bg-zinc-300" />
    </div>
  );
}
