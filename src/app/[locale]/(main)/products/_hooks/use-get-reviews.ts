// Imports

import { useQuery } from '@tanstack/react-query';
import { getReviewsService } from '@/lib/services/reviews.service';

// Custom Hook

/**
 * useGetReviews - Hook for fetching reviews for a specific product
 *
 * @param productId - The ID of the product to fetch reviews for
 * @returns Query object with reviews data and loading state
 */
export const useGetReviews = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviewsService(productId),
  });
};
