import React from 'react'

export default function CategoryCardSkeleton() {

  return (
    <div className="bg-zinc-200 w-fill h-12 rounded-md overflow-hidden flex items-center animate-pulse">

      {/*  category image skeleton */}
      <div className="bg-zinc-300 p-2 w-10 h-12 flex items-center justify-center" />

      {/* category name skeleton */}
      <div className="ml-3 flex-1 h-4 bg-zinc-300 rounded" />

    </div>
  );
}
