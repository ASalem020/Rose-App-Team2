// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { deleteAddressAction } from '@/lib/actions/delete-address.action';


// Custom Hook


/**
 * useDeleteAddress - Hook for deleting a user address
 *
 * Features:
 * - Wraps deleteAddressAction in a React Query mutation
 * - Automatically invalidates the 'addresses' query on success
 * - Shows success/error toast notifications
 * - Handles loading state via isPending
 *
 * @returns Mutation object with deleteAddress function and state flags
 */
export function useDeleteAddress() {
  const queryClient = useQueryClient();
  const t = useTranslations('pages.address.toasts');

  const { mutate: deleteAddress, isPending, error } = useMutation({
    mutationFn: async (addressId: string) => {
      // Call server action
      const payload = await deleteAddressAction(addressId);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success(t('deleteSuccess'));
      
      // Invalidate addresses cache to refresh the list
      queryClient.invalidateQueries({
        queryKey: ['addresses'],
      });
    },
    onError: (error: Error) => {
      // Show error message
      toast.error(error.message);
    },
  });

  return { deleteAddress, isPending, error };
}
