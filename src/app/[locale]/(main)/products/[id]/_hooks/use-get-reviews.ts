// Imports

import { useSuspenseQuery } from '@tanstack/react-query';
import { getReviewsService } from '@/lib/services/reviews.service';

// Custom Hook

/**
 * useGetReviews - Hook for fetching reviews for a specific product
 *
 * @param productId - The ID of the product to fetch reviews for
 * @returns Query object with reviews data (suspends while loading)
 */
export const useGetReviews = (productId: string) => {
  return useSuspenseQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviewsService(productId),
  });
};
