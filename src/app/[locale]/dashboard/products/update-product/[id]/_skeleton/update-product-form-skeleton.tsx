import { Skeleton } from '@/components/ui/skeleton';

export default function UpdateProductFormSkeleton() {
  return (
    <div className="flex w-2/3 flex-col gap-5 rounded-2xl border-zinc-200 p-6">
      {/* Title Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-40 w-full" />
      </div>

      <div className="flex w-full gap-2">
        {/* Price Skeleton */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Discount Skeleton */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Price after discount Skeleton */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Quantity Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Categories Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Occasions Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Submit Button Skeleton */}
      <Skeleton className="mt-32 h-10 w-full" />
    </div>
  );
}
