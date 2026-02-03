import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/tailwind-merge';

type ProductItemSkeletonPropsType = {
  divCustomClasses?: string,
  imgCustomClasses?: string
}

export default function ProductItemSkeleton({
  divCustomClasses,
  imgCustomClasses
}: ProductItemSkeletonPropsType) {
  return (
    <div className={cn(
      // Main Styles 
      "relative w-72 space-y-3 rounded-xl",
      // Custom Classes
      divCustomClasses
    )}>
      {/* Image Skeleton */}
      <Skeleton className={cn(
        // Main Styles
        "relative h-64 w-full overflow-hidden rounded-xl",
        // Custom Classes
        imgCustomClasses
      )} />

      {/* Title Skeleton */}
      <div>
        <Skeleton className="h-7 w-full" />
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          {/* Rating Skeleton */}
          <Skeleton className="h-5 w-24" />

          {/* Price Skeleton */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Cart Button Skeleton */}
        <Skeleton className="size-11 rounded-full" />
      </div>

      {/* "New" Badge Skeleton */}
      <Skeleton className="absolute right-4 top-4 h-4 w-11 rounded-lg" />
    </div>
  );
}