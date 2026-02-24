import { cn } from '@/lib/utils/tailwind-merge';
import { Star, StarHalf } from 'lucide-react';
import { useLocale } from 'next-intl';

type RatingPropsType = {
  rate: number;
  maxStars?: number;
  className?: string;
  starClassName?: string;
};

/**
 * Rating - Component for displaying a star rating
 * 
 * Features:
 * - Supports half-star display
 * - Handles RTL mirroring for half-stars
 * - Customizable star count and styling
 */
export default function Rating({
  rate,
  maxStars = 5,
  className,
  starClassName,
}: RatingPropsType) {
  // Navigation
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Variables
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starNumber = index + 1;

    // Partial fill (half star)
    if (rate >= starNumber - 0.5 && rate < starNumber) {
      return (
        <div key={index} className="relative h-4 w-4">
          <Star className={cn("h-4 w-4 text-[#FBA707]", starClassName)} />
          <StarHalf
            className={cn(
              "absolute inset-0 h-4 w-4 fill-[#FBA707] text-[#FBA707]",
              isRtl && "-scale-x-100",
              starClassName
            )}
          />
        </div>
      );
    }

    // Full fill
    if (rate >= starNumber) {
      return (
        <Star
          key={index}
          className={cn("h-4 w-4 fill-[#FBA707] text-[#FBA707]", starClassName)}
        />
      );
    }

    // No fill
    return (
      <Star
        key={index}
        className={cn("h-4 w-4 text-[#FBA707]", starClassName)}
      />
    );
  });

  return (
    <div className={cn('rating flex items-center gap-1', className)}>
      {stars}
    </div>
  );
}
