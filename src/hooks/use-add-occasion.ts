// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
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
 * - Builds FormData on the client so File objects don't cross the
 *   Server Action serialization boundary inside a plain object
 *
 * @returns Mutation object with addOccasion function and state flags
 */
export function useAddOccasion() {
  const queryClient = useQueryClient();
  const t = useTranslations('pages.dashboard.occasion.toasts');

  const { mutate: addOccasion, isPending, error, isSuccess } = useMutation({
    mutationKey: ['add-occasion'],
    mutationFn: async (fields: AddOccasionFields) => {
      // Build FormData on the CLIENT before calling the server action.
      // Next.js supports FormData as a built-in across the serialization
      // boundary, but File wrapped inside a plain object is NOT allowed.
      const formData = new FormData();
      formData.append('name', fields.name);
      if (fields.image) {
        formData.append('image', fields.image);
      }

      // Call server action with FormData
      const payload = await addOccasionAction(formData);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success(t('addSuccess'));

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
