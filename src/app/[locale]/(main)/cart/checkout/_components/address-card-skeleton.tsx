import { Skeleton } from '@/components/ui/skeleton';

export default function AddressCardSkeleton() {
  return (
    <div className="address-card animate-pulse rounded-xl border border-zinc-300 px-4 py-3.5">
      {/* Header */}
      <div className="header flex items-center justify-between">
        {/* City */}
        <Skeleton className="h-8 w-32 rounded-lg" />

        {/* Phone */}
        <div className="phone flex items-center gap-2.5">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-lg" />
        </div>
      </div>

      {/* Address */}
      <Skeleton className="address mt-1.5 h-7 w-48 rounded-full" />
    </div>
  );
}
