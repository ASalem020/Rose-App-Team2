import { getCategories } from '@/lib/services/category.services';
import { useQuery } from '@tanstack/react-query';

export default function useAllCategories() {

  // ^ 1 Get Categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  return {
    categories
  };
}
