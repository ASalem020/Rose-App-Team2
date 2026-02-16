import React from 'react';
import Image from 'next/image';
import { categories } from '@/lib/types/category';
import { cn } from '@/lib/utils/tailwind-merge';

type CategoryCardProps = {
  category: categories;
  isActive?: boolean;
};

export default function CategoryCard({
  category,
  isActive,
}: CategoryCardProps) {
  return (
    <div
      className={cn(
        'flex h-8 w-full items-center overflow-hidden rounded-md bg-zinc-200 hover:bg-zinc-300',
        isActive && 'bg-maroon-100/70',
      )}
    >
      {/* category image */}
      <div
        className={cn(
          'flex h-12 w-10 items-center justify-center bg-zinc-500 p-2',
          isActive && 'bg-maroon-600/70',
        )}
      >
        <Image
          src={category.image}
          alt={category.name}
          width={300}
          height={200}
          className="brightness-0 invert"
        />
      </div>

      {/* category name */}
      <h4 className="ml-3 flex items-center">
        {category.name}
      </h4>
    </div>
  );
}
