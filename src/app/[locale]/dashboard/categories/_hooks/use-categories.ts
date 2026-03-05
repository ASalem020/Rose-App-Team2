import { getCategoriesService } from '@/lib/services/category.service';
import { CategoriesResponse } from '@/lib/types/category';
import { useQuery } from '@tanstack/react-query';

export default function useCategories(page: number) {
  // ^ Query
  const { data, isLoading } = useQuery<CategoriesResponse>({
    queryKey: ['categories', page],
    queryFn: () => getCategoriesService(page),
  });

  return {
    categories: data?.categories ?? [],
    metadata: data?.metadata,
    isLoading,
  };
}
