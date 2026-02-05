import React from 'react'
import Image from 'next/image'
import { categories } from '@/lib/types/category'

type CategoryCardProps = {
category: categories,
isActive?: boolean
}


export default function CategoryCard({ category, isActive }: CategoryCardProps ) {

  return (
    <div className={`bg-zinc-200 hover:bg-zinc-300 w-fill h-12 rounded-md overflow-hidden flex items-center ${isActive ? 'bg-maroon-100/60' : ''}`}>

      {/*  category image */}
      <div className={`bg-zinc-500 p-2 w-10 h-12 object-cover flex items-center justify-center ${isActive ? 'bg-maroon-600/90' : ''}`}>
        <Image src={category.image} alt="Category Image" width={300} height={200} className="invert brightness-0" />
      </div>

      {/* category name */}
      <h4 className={`text-center flex items-center justify-center ml-3  `}>
        {category.name}

      </h4>

    </div>
  );
}
