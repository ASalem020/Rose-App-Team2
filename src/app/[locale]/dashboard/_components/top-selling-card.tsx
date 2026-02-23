'use client';

import { cn } from '@/lib/utils/tailwind-merge';
import { useDashboardProducts } from '../_hooks/use-products';
import CardSkeleton from './card-skeleton';

const colors = [
  'bg-gradient-to-r from-[#DFAC16]/25 to-[#DFAC16]/10 ',
  'bg-gradient-to-r from-[#757F95]/25 to-[#757F95]/10 ',
  'bg-gradient-to-r from-[#914400]/25 to-[#914400]/10 ',
];

export default function TopSellingCard() {
  // ^ hooks
  const { data, isLoading, isError } =
    useDashboardProducts();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      {data?.statistics?.topSellingProducts?.map(
        (item, index) => (
          <div
            key={item._id}
            className={cn(
              'mb-2.5 flex items-center justify-between px-2.5 py-1.5',
              colors[index] || 'bg-zinc-100',
            )}
          >
            <div className="flex items-center gap-2">
              <h3 className="max-w-[220px] truncate text-xl font-semibold capitalize text-zinc-800">
                {item.title}
              </h3>
              <span className="text-lg capitalize text-zinc-800">
                ({item.price} EGP)
              </span>
            </div>
            <span className="font-bold">
              {item.sold} Sales
            </span>
          </div>
        ),
      )}
    </>
  );
}
