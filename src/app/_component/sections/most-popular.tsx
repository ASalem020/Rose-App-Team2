'use client';
import ProductCard from '../product/product-card';
import { Suspense, useState } from 'react';
import { getAllProduct } from '@/lib/services/products.service';
import { Product } from '@/lib/types/product';
import { getOccasions } from '@/lib/services/occasions.service';
import MostPopularSkeleton from '../skeleton/most-popular-skeleton';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

export default function MostPopular() {
  const [activeOccasion, setActiveOccasion] = useState<
    string | null
  >(null);

  // ^ 1 Get occasions
  const { data: occasions } = useQuery({
    queryKey: ['occasions'],
    queryFn: getOccasions,
  });
  if (occasions?.length && !activeOccasion) {
    setActiveOccasion(occasions[0]._id);
  }

  // ^ 2 Get products by occasion
  const { data: products } = useQuery({
    queryKey: ['products-by-occasion', activeOccasion],
    queryFn: () =>
      getAllProduct({
        occasionsId: activeOccasion as string | null,
      }),
  });

  if (!occasions) {
    return <MostPopularSkeleton />;
  }

  return (
    <section className="mt-20">
      {/* tabs */}
      <div className="my-5 flex items-center justify-between">
      {/* ToDo : Hadغ is working on the component  */}
        <div className="text-2xl font-bold text-maroon-700 dark:text-pink-200">
          <h2>Most Popular</h2>
        </div>
        <div className="flex gap-8 text-sm font-medium">
          {occasions?.map(occasion => (
            <button
              key={occasion._id}
              onClick={() =>
                setActiveOccasion(occasion._id)
              }
              className={
                activeOccasion === occasion._id
                  ? 'text-maroon-600 dark:text-pink-200'
                  : 'text-zinc-700 dark:text-zinc-400'
              }
            >
              {occasion.name}
            </button>
          ))}
        </div>
      </div>
      {/* product */}
      <Suspense fallback={<MostPopularSkeleton />}>
        <div className="grid grid-cols-4 gap-4">
          {products?.map((product: Product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      </Suspense>

      <Link
        href={`/product`}
        className="text-semibold mt-6 flex items-center justify-end gap-2 p-2 text-maroon-700"
      >
        View Product
        <ArrowRight />
      </Link>
    </section>
  );
}
