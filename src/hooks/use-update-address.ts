import { useMutation } from '@tanstack/react-query';
import { updateAddressAction } from '@/lib/actions/update-address.action';
import { toast } from 'sonner';

interface UpdateAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}

export function useUpdateAddress() {
  const { mutate: updateAddress, isPending, error, isSuccess } = useMutation({
    mutationKey: ['update-address'],
    mutationFn: async ({ addressId, fields }: { addressId: string; fields: UpdateAddressFields }) => {
      const payload = await updateAddressAction(addressId, fields);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success('Address updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { updateAddress, isPending, error, isSuccess };
}
