// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { updateAddressAction } from '@/lib/actions/update-address.action';


// Types


interface UpdateAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}


// Custom Hook


/**
 * useUpdateAddress - Hook for updating user address information
 *
 * Features:
 * - Wraps the updateAddressAction in a React Query mutation
 * - Provides loading (isPending) and error states
 * - Shows automatic success/error toast notifications
 * - Type-safe mutation function
 * - Invalidates 'addresses' query on success
 *
 * @returns Mutation object with updateAddress function and state flags
 */
export function useUpdateAddress() {
  const queryClient = useQueryClient();
  const t = useTranslations('pages.address.toasts');

  const { mutate: updateAddress, isPending, error, isSuccess } = useMutation({
    mutationKey: ['update-address'],
    mutationFn: async ({ addressId, fields }: { addressId: string; fields: UpdateAddressFields }) => {
      // Call server action
      const payload = await updateAddressAction(addressId, fields);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success(t('updateSuccess'));

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

  return { updateAddress, isPending, error, isSuccess };
}
