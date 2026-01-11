import { cn } from '@/lib/utils/tailwind-merge';
import Image from 'next/image';
import React from 'react';

// Gallery Image Type
type GalleryImage = {
  src: string;
  height: number;
};

// Gallery Column Type
type GalleryColumn = GalleryImage[];

// Gallery Columns Data
const galleryColumns: GalleryColumn[] = [
  [
    {
      src: '/assets/images/gallery/Frame 74.svg',
      height: 617,
    },
    {
      src: '/assets/images/gallery/Frame 79.svg',
      height: 406,
    },
  ],
  [
    {
      src: '/assets/images/gallery/Frame 75.svg',
      height: 411,
    },
    {
      src: '/assets/images/gallery/Frame 78.svg',
      height: 611,
    },
  ],
  [
    {
      src: '/assets/images/gallery/Frame 76.svg',
      height: 411,
    },
    {
      src: '/assets/images/gallery/Frame 80.svg',
      height: 611,
    },
  ],
];

export default function Gallery() {
  return (
    <section className="mt-32">
      {/* Title */}
      <h6 className="mb-2 text-start text-sm font-bold uppercase tracking-[.25rem] text-softPink-500 md:text-center md:text-base">
        Gallery
      </h6>

      {/* Description */}
      <p
        className={cn(
          // Main Styles
          'relative w-fit text-start text-2xl font-bold text-maroon-700 md:mx-auto md:text-center md:text-3xl lg:text-4xl',
          // Before Styles
          'before:absolute before:left-0 before:top-3/4 before:z-0 before:h-4 before:w-3/4 before:rounded-r-2xl before:bg-softPink-100',
          // After Styles
          'after:absolute after:-bottom-[0.375rem] after:left-0 after:z-0 after:h-[0.125rem] after:w-40 after:bg-softPink-600',
          // Dark Styles
          'dark:text-softPink-200 before:dark:bg-zinc-700 after:dark:bg-softPink-500',
        )}
      >
        <span className="relative z-10">
          Check Out our Wonderful Gallery
        </span>
      </p>

      {/* Masonry Grid Gallery */}
      <div className="mt-10 flex justify-center">
        <div className="inline-grid grid-flow-col gap-3">
          {/* Gallery Columns */}
          {galleryColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="grid gap-3">
              {/* Gallery Images */}
              {column.map((img, index) => (
                <Image
                  key={index}
                  src={img.src}
                  alt="Gallery image"
                  width={420}
                  height={img.height}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
