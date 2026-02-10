import { Skeleton } from '@/components/ui/skeleton';

/**
 * ReviewsSkeleton - Loading skeleton for the reviews list
 * Displays 3 placeholder review items with user info, rating, and text
 */
export default function ReviewsSkeleton() {
    return (
        <div className="col-span-2 max-h-96 space-y-6 overflow-y-auto pr-2">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="space-y-3 border-b border-zinc-100 pb-6 last:border-0 dark:border-zinc-800"
                >
                    {/* Header: User info and rating */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-1">
                                {/* Name */}
                                <Skeleton className="h-5 w-28" />
                                {/* Date */}
                                <Skeleton className="h-3 w-20" />
                            </div>
                        </div>
                        {/* Rating stars */}
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                    </div>

                    {/* Review content */}
                    <div className="space-y-2">
                        {/* Title */}
                        <Skeleton className="h-5 w-48" />
                        {/* Comment */}
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}
