import { DashboardProducts } from '@/lib/types/dashboard-products';
import { useQuery } from '@tanstack/react-query';

export function useDashboardProducts() {
  // Hooks
  const { data, isLoading, isError } =
    useQuery<DashboardProducts>({
      queryKey: ['top-selling-products'],
      queryFn: async () => {
        const res = await fetch(
          '/api/top-selling-products',
        );
        if (!res.ok) {
          throw new Error(
            'Failed to fetch top selling products',
          );
        }
        const payload = await res.json();
        return payload;
      },
    });
  return {
    data,
    isLoading,
    isError,
  };
}
