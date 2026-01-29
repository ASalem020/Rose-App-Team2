import { getAllProduct } from '@/lib/services/products.service';
import { useQuery } from '@tanstack/react-query';


export default function useBestSellingProducts() {
      const { data, isLoading } = useQuery({
        queryKey: ['bestSellingProducts'],
        queryFn: () =>
          getAllProduct({ limit: 6, sort: '-sold' }),
      });
  return {
    data,
    isLoading,
  }
}
