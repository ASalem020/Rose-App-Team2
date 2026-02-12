import { useMutation } from '@tanstack/react-query';
import { addAddressAction } from '@/lib/actions/add-address.action';
import { toast } from 'sonner';

interface AddAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}

export function useAddAddress() {
  const { mutate: addAddress, isPending, error, isSuccess } = useMutation({
    mutationKey: ['add-address'],
    mutationFn: async (fields: AddAddressFields) => {
      const payload = await addAddressAction(fields);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success('Address added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { addAddress, isPending, error, isSuccess };
}
