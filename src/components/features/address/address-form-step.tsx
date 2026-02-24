'use client';


// Imports


import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { PhoneInput } from '@/components/ui/phone-input';
import type { AddressFormData } from '../../../lib/types/address';


// Types


type FormValues = {
  city: string;
  street: string;
  phone: string;
};

interface AddressFormStepProps {
  /** Initial data for pre-filling the form (e.g., when editing) */
  initialData?: AddressFormData | null;
  /** Default phone number to fallback to */
  defaultPhone?: string;
  /** Callback function when the form is successfully submitted */
  onSubmit: (data: AddressFormData) => void;
}


/**
 * AddressFormStep - Step 1 of the address wizard: Basic details
 *
 * Features:
 * - Form validation using Zod and React Hook Form
 * - Specialized phone input with international support
 * - Dynamic pre-filling of values for editing
 * - Dark mode optimized styling
 *
 * @param props - Component properties
 */
export default function AddressFormStep({
  initialData,
  defaultPhone = '',
  onSubmit,
}: AddressFormStepProps) {

  // Context


  const t = useTranslations('pages.address.form');


  // Form & Validation


  const addressFormSchema = z.object({
    city: z.string().min(2, t('validation.cityMin')),
    street: z.string().min(3, t('validation.streetMin')),
    phone: z.string().min(10, t('validation.phoneMin')),
  });


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      city: initialData?.city || '',
      street: initialData?.street || '',
      phone: initialData?.phone || defaultPhone,
    },
  });


  // Handlers


  /**
   * Final form submission handler
   * @param data - Validated form values
   */
  const onFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      name: initialData?.name || '',
      id: initialData?.id,
    });
  };


  // Render


  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      {/* City */}
      <div>
        <Label
          htmlFor="city"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
        >
          {t('city.label')}
        </Label>
        <Input
          id="city"
          placeholder={t('city.placeholder')}
          {...register('city')}
          className="h-11 text-sm border-gray-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white focus:border-red-500 dark:focus:border-softPink-500 focus:ring-red-500 dark:focus:ring-softPink-500"
        />
        {errors.city && (
          <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <Label
          htmlFor="street"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
        >
          {t('street.label')}
        </Label>
        <textarea
          id="street"
          placeholder={t('street.placeholder')}
          {...register('street')}
          rows={4}
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md resize-none focus:border-red-500 dark:focus:border-softPink-500 focus:ring-1 focus:ring-red-500 dark:focus:ring-softPink-500 focus:outline-none placeholder:text-start"
        />
        {errors.street && (
          <p className="text-xs text-red-500 mt-1">{errors.street.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label
          htmlFor="phone"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block"
        >
          {t('phone.label')}
        </Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              defaultCountry="EG"
              placeholder={t('phone.placeholder')}
              value={field.value}
              onChange={field.onChange}
              error={!!errors.phone}
            />
          )}
        />
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Next button */}
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full h-12 font-medium rounded-lg text-base"
        >
          {t('next')}
        </Button>
      </div>
    </form>
  );
}
