import { useMutation } from '@tanstack/react-query';
import { checkoutSession } from '@/lib/actions/checkout-session.action';
import { CheckoutSchemaType } from '@/lib/types/checkout';

export default function useCheckout() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: (data: CheckoutSchemaType) =>
      checkoutSession(data),
  });

  return { isPending, error, mutate };
}
