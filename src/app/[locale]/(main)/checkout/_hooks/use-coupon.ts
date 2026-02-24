import { applyCoupon } from '@/lib/actions/apply-coupon';
import { useMutation } from '@tanstack/react-query';

export default function useCoupon() {
  const { data, mutate, isPending, error } = useMutation({
    mutationKey: ['check-coupon'],
    mutationFn: (coupon: string) => applyCoupon(coupon),
  });

  return { data, mutate, isPending, error };
}
