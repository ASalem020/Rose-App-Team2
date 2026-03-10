import { Skeleton } from '@/components/ui/skeleton';

/**
 * RelatedProductsSkeleton - Loading skeleton for the related products carousel
 * Displays section header and 4 product card placeholders
 */
export default function RelatedProductsSkeleton() {
    return (
        <section className="space-y-6">
            {/* Section Header */}
            <div className="flex justify-start">
                <Skeleton className="h-8 w-48" />
            </div>

            {/* Products Carousel */}
            <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="relative w-72 shrink-0 space-y-3 rounded-xl"
                    >
                        {/* Product Image */}
                        <Skeleton className="relative h-64 w-full overflow-hidden rounded-xl" />

                        {/* Product Title */}
                        <Skeleton className="h-7 w-full" />

                        {/* Bottom Section */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-2">
                                {/* Rating */}
                                <Skeleton className="h-5 w-24" />
                                {/* Price */}
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>

                            {/* Cart Button */}
                            <Skeleton className="size-11 rounded-full" />
                        </div>

                        {/* Badge */}
                        <Skeleton className="absolute right-4 top-4 h-4 w-11 rounded-lg" />
                    </div>
                ))}
            </div>
        </section>
    );
}
