// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { updateOccasionAction } from '@/lib/actions/update-occasion.action';


// Types


interface UpdateOccasionFields {
  name: string;
  // image is intentionally omitted — edit page is view-only for images.
  // The API preserves the existing image when no new image is sent.
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
 * - Builds FormData on the client so File objects don't cross the
 *   Server Action serialization boundary inside a plain object.
 *   Only appends 'image' to FormData when the user picked a new file.
 *
 * @returns Mutation object with updateOccasion function and state flags
 */
export function useUpdateOccasion() {
  const queryClient = useQueryClient();
  const t = useTranslations('pages.dashboard.occasion.toasts');

  const { mutate: updateOccasion, isPending, error, isSuccess } = useMutation({
    mutationKey: ['update-occasion'],
    mutationFn: async ({
      occasionId,
      fields,
    }: {
      occasionId: string;
      fields: UpdateOccasionFields;
    }) => {
      // Build FormData on the CLIENT before calling the server action.
      // Next.js supports FormData as a built-in across the serialization
      // boundary, but File wrapped inside a plain object is NOT allowed.
      const formData = new FormData();
      formData.append('name', fields.name);
      // image is not sent — API keeps the existing image automatically

      // Call server action with FormData
      const payload = await updateOccasionAction(occasionId, formData);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: (_, { occasionId }) => {
      // Show success message
      toast.success(t('updateSuccess'));

      // Invalidate the full list so the table refreshes
      queryClient.invalidateQueries({
        queryKey: ['occasions'],
      });

      // Invalidate the individual occasion so the edit form
      // shows fresh data if the user navigates back to it
      queryClient.invalidateQueries({
        queryKey: ['occasion', occasionId],
      });
    },
    onError: (error: Error) => {
      // Show error message
      toast.error(error.message);
    },
  });

  return { updateOccasion, isPending, error, isSuccess };
}
