'use client';

import { Product } from '@/lib/types/product';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductGallery({
  product,
}: {
  product: Product;
}) {
  const [activeImage, setActiveImage] = useState(
    product?.images[0] || '',
  );

  return (
    <div className="flex w-1/2 flex-col gap-4">
      {/* Image Gallery */}
      <div className="flex h-100 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900">
        {/* Active image */}
        <Image
          src={activeImage}
          alt="Product Details"
          width={600}
          height={400}
          className="h-full w-full rounded-xl object-cover transition-all"
        />
      </div>

      {/* Products Thumbnails */}
      <div className="flex flex-row gap-4">
        {product?.images?.map((img, index) => (
          <div
            key={index}
            onClick={() => setActiveImage(img)}
            className="relative cursor-pointer rounded-lg"
          >
            <Image
              src={img}
              alt={`Product Thumbnail ${index + 1}`}
              width={90}
              height={110}
              className={`h-28 w-24 rounded-lg object-cover transition-all ${
                activeImage === img
                  ? 'border-2 border-maroon-600'
                  : 'border-transparent'
              }`}
            />

            {/* overlay */}
            {activeImage !== img && (
              <div className="absolute inset-0 rounded-lg bg-[#0000004D] transition-all hover:bg-[#0000001A]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
