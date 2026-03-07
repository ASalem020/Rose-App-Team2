// Imports


import { useQuery } from '@tanstack/react-query';
import { getOccasionAction } from '@/lib/actions/get-occasion.action';
import { Occasion } from '@/lib/types/occasion';


// Custom Hook


/**
 * useGetOccasion - Hook for fetching a single occasion by ID
 *
 * Features:
 * - Wraps getOccasionAction in a React Query query
 * - Skips the fetch if no ID is provided
 * - Returns the occasion data, loading state, and error state
 *
 * @param occasionId - The ID of the occasion to fetch
 * @returns Query object with occasion data and state flags
 */
export function useGetOccasion(occasionId: string | undefined) {
  const {
    data: occasion,
    isLoading,
    isError,
  } = useQuery<Occasion>({
    queryKey: ['occasion', occasionId],
    queryFn: async () => {
      const payload = await getOccasionAction(occasionId!);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    // Only run if we have an ID
    enabled: !!occasionId,
  });

  return { occasion, isLoading, isError };
}
