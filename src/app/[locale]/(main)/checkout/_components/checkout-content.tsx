'use client';
import { useState } from 'react';
import Addresses from './addresses';
import PaymentMethods from './payment-methods';
import StepsProgress from './steps-progress';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { checkoutSchema } from '@/lib/schemas/checkout.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/shared/error-message';
import { CheckoutSchemaType } from '@/lib/types/checkout';
import useCheckout from '../_hooks/use-checkout';
import { toast } from 'sonner';
import { useRouter } from '@/i18n/navigation';

export default function CheckoutContent() {
  // Translation
  const t = useTranslations('pages');

  // Navigation
  const router = useRouter();

  // State
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Hooks
  const { mutate, error } = useCheckout();

  // Form & Validation
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shippingAddress: {
        street: '',
        phone: '',
        city: '',
        lat: '',
        long: '',
      },
      'payment-method': '',
    },
    resolver: zodResolver(checkoutSchema(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<
    CheckoutSchemaType
  > = values =>
    mutate(values, {
      onSuccess: () => {
        toast.success(t('checkout.success'));
        router.push('/products');
      },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Steps Progress */}
      <StepsProgress currentStep={currentStep} />

      {/* Current Step ( Addresses OR Payment Methods ) */}
      {currentStep === 1 ? (
        <Addresses
          setStep={setCurrentStep}
          setValue={setValue}
          getValues={getValues}
        />
      ) : (
        <PaymentMethods
          setStep={setCurrentStep}
          setValue={setValue}
          getValues={getValues}
        />
      )}

      {/* Error Messages */}
      {errors.shippingAddress && (
        <ErrorMessage
          message={t(
            'checkout.validation.address.required',
          )}
          className="mt-5"
        />
      )}

      {errors['payment-method'] && (
        <ErrorMessage
          message={errors['payment-method'].message}
          className="mt-5"
        />
      )}

      {error && (
        <ErrorMessage
          message={error.message}
          className="mt-5"
        />
      )}
    </form>
  );
}
