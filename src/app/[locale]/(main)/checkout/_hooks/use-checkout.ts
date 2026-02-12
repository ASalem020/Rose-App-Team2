import { useMutation } from '@tanstack/react-query';
import {
  checkoutSessionCash,
  checkoutSessionCredit,
} from '@/lib/actions/checkout-session.action';
import { CheckoutSchemaType } from '@/lib/types/checkout';

export default function useCheckout() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: (data: CheckoutSchemaType) => {
      // Call Credit Endpoint
      if (data['payment-method'] === 'credit-card')
        return checkoutSessionCredit(data);

      // Call Cash Endpoint
      return checkoutSessionCash(data);
    },
  });

  return { isPending, error, mutate };
}
