'use client';
import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '../product/product-card';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import useBestSellingProducts from '@/hooks/use-products-best-selling';
import BestSellingSkeleton from '@/components/skeleton/best-selling-skeleton';

export default function BestSelling() {
  // ^  Get products
  const { data, isLoading } = useBestSellingProducts();

  if (isLoading) {
    return <BestSellingSkeleton />;
  }

  return (
    <section className="grid grid-cols-4 items-center gap-12">
      {/* ^ part one */}
      <div className="bg-warning-200 col-span-1 w-72 space-y-5">
        <h3 className="text-xl font-semibold tracking-widest text-pink-500 dark:text-maroon-400">
          Best Selling
        </h3>
        <h4 className="text-3xl font-bold text-maroon-700 dark:text-pink-200">
          <span className="text-pink-500 dark:text-maroon-400">
            {' '}
            Check Out{' '}
          </span>{' '}
          What Everyone’s
          <span className="text-pink-500 dark:text-maroon-400">
            {' '}
            Buying{' '}
          </span>{' '}
          Right Now
        </h4>
        <p className="text-sm text-muted-foreground text-zinc-500 dark:text-zinc-400">
          Not sure what to choose? Start with our best
          sellers, these are the gifts our customers keep
          coming back for. Whether you are celebrating a
          birthday, anniversary or wedding, our top picks
          are guaranteed to leave a lasting impression.
        </p>

        <Button className="flex items-center justify-center gap-5 rounded-lg bg-maroon-600 px-4 py-2 text-white dark:bg-pink-200 dark:text-zinc-800">
          Explore gifts <ArrowRight />
        </Button>
      </div>

      {/* ^ partr two */}
      <div className="col-span-3 flex">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {data?.map((product: Product) => (
              <CarouselItem
                key={product._id}
                className="flex basis-1/3 items-center justify-center bg-white dark:bg-black"
              >
                <ProductCard productInfo={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
          <CarouselNext className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
        </Carousel>
      </div>
    </section>
  );
}
