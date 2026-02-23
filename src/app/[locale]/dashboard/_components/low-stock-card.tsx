'use client';

import { cn } from '@/lib/utils/tailwind-merge';
import { useDashboardProducts } from '../_hooks/use-products';
import CardSkeleton from './card-skeleton';

export default function LowStockCard() {
  // ^ hooks
  const { data, isLoading, isError } =
    useDashboardProducts();

  if (isLoading) return <CardSkeleton />;
  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      {[...(data?.statistics?.lowStockProducts || [])]
        .sort((a, b) => a.quantity - b.quantity)
        .map(item => (
          <div
            key={item._id}
            className="mb-2.5 flex items-center justify-between border-b border-gray-200 pb-2.5"
          >
            <h3 className="max-w-[220px] truncate text-xl capitalize text-zinc-800">
              {item.title}
            </h3>
            <span
              className={cn(
                'text-xl capitalize',
                item.quantity <= 5
                  ? 'text-red-600'
                  : 'text-zinc-800',
              )}
            >
              {item.quantity <= 0 ? ' 0 ' : item.quantity}{' '}
              Products
            </span>
          </div>
        ))}
    </>
  );
}
