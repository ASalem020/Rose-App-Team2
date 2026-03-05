'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useProductGallery } from '../_hooks/product-gallery';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

type ProductGalleryProps = {
  productId: string;
};

export default function ProductGallery({
  productId,
}: ProductGalleryProps) {
  // States
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Query
  const { gallery, isLoading } =
    useProductGallery(productId);

  // Variables
  const count = gallery?.length || 0;

  // Effects
  useEffect(() => {
    if (!api) return;

    api.on('select', () =>
      setCurrent(api.selectedScrollSnap()),
    );
  }, [api, gallery]);

  return (
    <Carousel
      className="relative flex w-full flex-col justify-between gap-6"
      setApi={setApi}
    >
      {/* Content */}
      <CarouselContent>
        {/* Skeleton Loading State */}
        {isLoading ? (
          <CarouselItem>
            <div className="image-box relative flex min-h-[30rem] justify-center rounded-xl border border-black/10">
              <Skeleton className="h-[35.375rem] w-[26.875rem] animate-pulse bg-gray-50" />
            </div>
          </CarouselItem>
        ) : (
          // Gallery Images
          gallery?.map((image, index) => (
            <CarouselItem key={index}>
              <div className="image-box relative flex min-h-[30rem] justify-center rounded-xl border border-black/10">
                <Image
                  src={image}
                  alt="Product Image"
                  width={430}
                  height={566}
                />
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>

      {/* Footer */}
      <div className="footer static flex w-full items-center justify-between">
        <div className="pagination flex items-center gap-2.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-3.5 w-3.5 rounded-full transition-all ${
                i === current
                  ? 'bg-maroon-600'
                  : 'bg-black/15 hover:bg-black/30'
              }`}
            />
          ))}
        </div>
        <div className="navigation flex gap-2.5">
          <CarouselPrevious className="static -translate-y-0" />
          <CarouselNext className="static -translate-y-0" />
        </div>
      </div>
    </Carousel>
  );
}
