import { getCategoriesService } from '@/lib/services/category.service';
import { CategoriesResponse } from '@/lib/types/category';
import { useQuery } from '@tanstack/react-query';

export default function useCategories() {
  // Query
  const { data } = useQuery<CategoriesResponse>({
    queryKey: ['categories'],
    queryFn: getCategoriesService,
  });

  return {
    categories: data?.categories ?? [],
  };
}
