// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addOccasionAction } from '@/lib/actions/add-occasion.action';


// Types


interface AddOccasionFields {
  name: string;
  image?: File;
}


// Custom Hook


/**
 * useAddOccasion - Hook for creating a new occasion
 *
 * Features:
 * - Wraps addOccasionAction in a React Query mutation
 * - Handles mutation state (isPending, error, isSuccess)
 * - Automatic success/error toast notifications
 * - Type-safe mutation inputs
 * - Invalidates 'occasions' query on success
 *
 * @returns Mutation object with addOccasion function and state flags
 */
export function useAddOccasion() {
  const queryClient = useQueryClient();

  const { mutate: addOccasion, isPending, error, isSuccess } = useMutation({
    mutationKey: ['add-occasion'],
    mutationFn: async (fields: AddOccasionFields) => {
      // Call server action
      const payload = await addOccasionAction(fields);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success('Occasion created successfully!');

      // Invalidate occasions cache to refresh the list
      queryClient.invalidateQueries({
        queryKey: ['occasions'],
      });
    },
    onError: (error: Error) => {
      // Show error message
      toast.error(error.message);
    },
  });

  return { addOccasion, isPending, error, isSuccess };
}
