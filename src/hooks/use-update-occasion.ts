// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateOccasionAction } from '@/lib/actions/update-occasion.action';


// Types


interface UpdateOccasionFields {
  name: string;
}


// Custom Hook


/**
 * useUpdateOccasion - Hook for updating an existing occasion
 *
 * Features:
 * - Wraps updateOccasionAction in a React Query mutation
 * - Provides loading (isPending) and error states
 * - Shows automatic success/error toast notifications
 * - Type-safe mutation function
 * - Invalidates 'occasions' query on success
 *
 * @returns Mutation object with updateOccasion function and state flags
 */
export function useUpdateOccasion() {
  const queryClient = useQueryClient();

  const { mutate: updateOccasion, isPending, error, isSuccess } = useMutation({
    mutationKey: ['update-occasion'],
    mutationFn: async ({
      occasionId,
      fields,
    }: {
      occasionId: string;
      fields: UpdateOccasionFields;
    }) => {
      // Call server action
      const payload = await updateOccasionAction(occasionId, fields);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success('Occasion updated successfully!');

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

  return { updateOccasion, isPending, error, isSuccess };
}
