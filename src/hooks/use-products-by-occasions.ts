import { getAllProduct } from '@/lib/services/products.service';
import { useQuery } from '@tanstack/react-query';

export default function useProductsByOccasions({activeOccasion} : {activeOccasion: string | null}) {

  const { data: products } = useQuery({
    queryKey: ['products-by-occasion', activeOccasion],
    queryFn: () =>
      getAllProduct({
        occasionsId: activeOccasion as string | null,
      }),
  });

  return {
    products,
  };
}
