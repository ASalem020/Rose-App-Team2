import { useMutation } from '@tanstack/react-query';
import { checkoutSessionCash } from '@/lib/actions/checkout-session.action';
import { CheckoutSchemaType } from '@/lib/types/checkout';

export default function useCashCheckout() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: (data: CheckoutSchemaType) =>
      checkoutSessionCash(data),
  });

  return { isPending, error, mutate };
}
