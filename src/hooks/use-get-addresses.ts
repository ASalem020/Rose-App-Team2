// Imports


import { useQuery } from '@tanstack/react-query';
import { GetAddresses } from '@/lib/actions/get-addresses.action';


// Custom Hook


/**
 * useGetAddresses - Hook for fetching the list of user addresses
 *
 * Features:
 * - Uses React Query for state management and caching
 * - Automatically handles loading and error states
 * - Re-fetches on window focus or manual invalidation
 *
 * @returns Query object with address data and status flags
 */
export function useGetAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const { error, data } = await GetAddresses();

      if (error) {
        throw new Error(error);
      }

      // Ensure data is in the expected array format
      const addressesArray = data?.addresses || data || [];
      return addressesArray;
    },
  });
}
