import SectionHeader from '@/components/shared/section-header';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

// Gallery Image Type
type GalleryImage = {
  src: string;
  height: number;
};

// Gallery Column Type
export type GalleryColumn = GalleryImage[];

// Gallery Columns Data
export const GALLERY_COLUMNS: GalleryColumn[] = [
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
  // Translations
  const t = useTranslations('pages.home.gallery');

  return (
    <section className="container mx-auto mt-32">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />

      {/* Masonry Grid Gallery */}
      <div className="mt-10 flex justify-center">
        <div className="inline-grid grid-flow-col gap-3">
          {/* Gallery Columns */}
          {GALLERY_COLUMNS.map((column, columnIndex) => (
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
