// Imports


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { addAddressAction } from '@/lib/actions/add-address.action';


// Types


interface AddAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}


// Custom Hook


/**
 * useAddAddress - Hook for creating a new user address
 *
 * Features:
 * - Wraps the addAddressAction in a React Query mutation
 * - Handles mutation state (isPending, error, isSuccess)
 * - Automatic success/error toast notifications
 * - Type-safe mutation inputs
 * - Invalidates 'addresses' query on success
 *
 * @returns Mutation object with addAddress function and state flags
 */
export function useAddAddress() {
  const queryClient = useQueryClient();
  const t = useTranslations('pages.address.toasts');

  const { mutate: addAddress, isPending, error, isSuccess } = useMutation({
    mutationKey: ['add-address'],
    mutationFn: async (fields: AddAddressFields) => {
      // Call server action
      const payload = await addAddressAction(fields);

      // Handle server-side errors
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      // Show success message
      toast.success(t('addSuccess'));
      
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

  return { addAddress, isPending, error, isSuccess };
}
