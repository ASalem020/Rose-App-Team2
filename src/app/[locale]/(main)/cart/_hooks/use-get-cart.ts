import { getCartService } from '@/lib/services/cart-service';
import { useQuery } from '@tanstack/react-query';

export const useGetCart = ({
  enabled,
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartService(),
    enabled,
  });
};
