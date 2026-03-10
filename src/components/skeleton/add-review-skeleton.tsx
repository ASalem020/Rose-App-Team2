import { Skeleton } from '@/components/ui/skeleton';

/**
 * AddReviewSkeleton - Loading skeleton for the add review form
 * Displays placeholder for rating stars, title input, comment textarea, and submit button
 */
export default function AddReviewSkeleton() {
    return (
        <div className="relative h-full col-span-1 border-l-2 border-zinc-200">
            <div className="flex h-full flex-col justify-between space-y-4 rounded-lg px-6 dark:bg-zinc-800/50">
                {/* Rating Input */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20" />
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Skeleton key={star} className="h-6 w-6 rounded-sm" />
                        ))}
                    </div>
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                {/* Comment Textarea */}
                <div className="space-y-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-24 w-full rounded-md" />
                </div>

                {/* Submit Button */}
                <Skeleton className="h-12 w-full rounded-lg" />
            </div>
        </div>
    );
}
