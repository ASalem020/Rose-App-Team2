import { addToCartAction } from '@/lib/actions/add-to-cart-action';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useAddCart() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => {
      const payload = await addToCartAction(id);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return { isPending, error, addToCart: mutate };
}
