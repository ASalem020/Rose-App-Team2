import React from 'react'
import Image from 'next/image'
import { categories } from '@/lib/types/category'
import { cn } from '@/lib/utils/tailwind-merge'

type CategoryCardProps = {
  category: categories,
  isActive?: boolean
}

export default function CategoryCard({ category, isActive }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "bg-zinc-200 hover:bg-zinc-300 w-full h-8 rounded-md overflow-hidden flex items-center",
        isActive && "bg-maroon-100/70"
      )}
    >
      {/* category image */}
      <div
        className={cn(
          "bg-zinc-500 p-2 w-10 h-12 flex items-center justify-center",
          isActive && "bg-maroon-600/70"
        )}
      >
        <Image
          src={category.image}
          alt={category.name}
          width={300}
          height={200}
          className="invert brightness-0"
        />
      </div>

      {/* category name */}
      <h4 className="ml-3 flex items-center">
        {category.name}
      </h4>
    </div>
  );
}
