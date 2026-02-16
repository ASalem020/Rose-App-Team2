import { getCategoriesService } from '@/lib/services/category.services';
import { useQuery } from '@tanstack/react-query';

export default function useAllCategories() {
  // ^ 1 Get Categories
  const { data: categories, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesService,
  });
  return {
    categories,
    isPending,
  };
}
