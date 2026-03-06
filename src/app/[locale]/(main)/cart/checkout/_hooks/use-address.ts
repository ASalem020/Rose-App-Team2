import { getAddressService } from '@/lib/services/addresses.service';
import { Address } from '@/lib/types/address';
import { useQuery } from '@tanstack/react-query';

export default function useAddress() {
  const {
    data: addresses,
    isLoading,
    error,
  } = useQuery<Address[]>({
    queryKey: ['user-addresses'],
    queryFn: getAddressService,
  });

  return { addresses, isLoading, error };
}
