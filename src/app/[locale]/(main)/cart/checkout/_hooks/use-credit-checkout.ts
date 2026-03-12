import { useMutation } from '@tanstack/react-query';
import { checkoutSessionCredit } from '@/lib/actions/checkout-session.action';
import { CheckoutSchemaType } from '@/lib/types/checkout';
import { useRouter } from '@/i18n/navigation';

export default function useCreditCheckout() {
  // Navigation
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: (data: CheckoutSchemaType) =>
      checkoutSessionCredit(data),
    onSuccess: (data: { session: { url: string } }) => {
      router.push(data.session.url);
    },
  });

  return { isPending, error, mutate };
}
