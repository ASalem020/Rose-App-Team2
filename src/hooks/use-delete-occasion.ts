// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteOccasionAction } from '@/lib/actions/delete-occasion.action';


// Custom Hook


/**
 * useDeleteOccasion - Hook for deleting an occasion
 *
 * Features:
 * - Wraps deleteOccasionAction in a React Query mutation
 * - Automatically invalidates the 'occasions' query on success
 * - Shows success/error toast notifications
 * - Handles loading state via isPending
 *
 * @returns Mutation object with deleteOccasion function and state flags
 */
export function useDeleteOccasion() {
  const queryClient = useQueryClient();
  const t = useTranslations('pages.dashboard.occasion.toasts');

  const { mutate: deleteOccasion, isPending, error } = useMutation({
    mutationKey: ['delete-occasion'],
    mutationFn: async (occasionId: string) => {
      // Call server action
      const payload = await deleteOccasionAction(occasionId);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success(t('deleteSuccess'));

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

  return { deleteOccasion, isPending, error };
}
