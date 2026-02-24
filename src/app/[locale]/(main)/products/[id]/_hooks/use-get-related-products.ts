// Imports

import { useSuspenseQuery } from '@tanstack/react-query';
import { getRelatedProductsService } from '@/lib/services/products.service';

// Custom Hook

/**
 * useGetRelatedProducts - Hook for fetching related products by category
 *
 * @param productId - The ID of the current product to find related items for
 * @returns Query object with related products data (suspends while loading)
 */
export const useGetRelatedProducts = (
  productId: string
) => {
  return useSuspenseQuery({
    queryKey: ['related-products', productId],
    queryFn: () => getRelatedProductsService(productId),
  });
};
