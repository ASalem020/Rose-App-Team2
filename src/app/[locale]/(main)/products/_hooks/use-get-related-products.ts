// Imports

import { useQuery } from '@tanstack/react-query';
import { getRelatedProductsService } from '@/lib/services/products.service';

// Custom Hook

/**
 * useGetRelatedProducts - Hook for fetching related products by category
 *
 * @param productId - The ID of the current product to find related items for
 * @returns Query object with related products data and loading state
 */
export const useGetRelatedProducts = (
  productId: string,
) => {
  return useQuery({
    queryKey: ['related-products', productId],
    queryFn: () => getRelatedProductsService(productId),
  });
};
