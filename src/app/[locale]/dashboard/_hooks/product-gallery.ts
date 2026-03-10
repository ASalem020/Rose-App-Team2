import { getProductDetailsService } from '@/lib/services/product-details.service';
import { useQuery } from '@tanstack/react-query';

export const useProductGallery = (productId: string) => {
  // Query
  const { data: product, isLoading } = useQuery({
    queryKey: ['product-data', productId],
    queryFn: () => getProductDetailsService(productId),
  });

  return { gallery: product?.images, isLoading };
};
