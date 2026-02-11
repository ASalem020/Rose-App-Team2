'use client';

import ErrorMessage from '@/components/shared/error-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { validCoupon } from '@/lib/schemas/checkout.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketPercent } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import useCoupon from '../_hooks/use-coupon';
import { toast } from 'sonner';

type ApplyCouponProps = {
  setCoupon: React.Dispatch<
    React.SetStateAction<
      { coupon: string; percentage: string }[]
    >
  >;
};

export default function ApplyCoupon({
  setCoupon,
}: ApplyCouponProps) {
  // Translation
  const t = useTranslations('pages.checkout.price-summary');

  // Mutation
  const { data, mutate, error } = useCoupon();

  // Form & Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      coupon: '',
    },
    resolver: zodResolver(validCoupon(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<{
    coupon: string;
  }> = values =>
    mutate(values.coupon, {
      onSuccess: () => {
        toast.success(t('coupon-applied'));
        setCoupon(prev => [
          ...prev,
          {
            coupon: values.coupon,
            percentage:
              data?.discountAmount?.toString() || '0',
          },
        ]);
      },
      onError: () =>
        setError('coupon', {
          message: error?.message || t('coupon-error'),
        }),
    });

  return (
    <>
      <form
        className="validate-coupon flex items-center gap-2.5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder={t('coupon-placeholder')}
          {...register('coupon')}
        />
        <Button className="px-4 py-2.5" type="submit">
          <span>
            <TicketPercent size={24} />
          </span>
          <span>{t('apply')}</span>
        </Button>
      </form>

      {/* Error Message */}
      {errors.coupon && (
        <ErrorMessage message={errors.coupon.message} />
      )}
    </>
  );
}
