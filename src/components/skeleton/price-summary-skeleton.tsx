import { Skeleton } from '@/components/ui/skeleton';

export default function PriceSummarySkeleton() {
  return (
    <div className="priceSummary w-full">
      {/* Title Skeleton */}
      <Skeleton className="mb-6 h-10 w-48" />

      {/* Total & Coupons Container Skeleton */}
      <div className="total-coupons flex flex-col gap-2.5 rounded-md bg-zinc-50 p-4">
        {/* Apply Coupon Skeleton (Input + Button) */}
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-24" />
        </div>

        {/* Total Section Skeleton */}
        <div className="total flex flex-col gap-4 p-2.5">
          {/* Sub Total */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>

          {/* Discount Line */}
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-[1px] flex-1" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-[1px] flex-1" />
          </div>

          {/* total */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
}
