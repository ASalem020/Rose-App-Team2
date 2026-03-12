'use client';


// Imports


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { PhoneInput } from '@/components/ui/phone-input';
import type { AddressFormData } from '../../../lib/types/address';
import { addressFormSchema } from '../../../lib/schemas/address.schema';


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

  const form = useForm<FormValues>({
    resolver: zodResolver(addressFormSchema(t)),
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-5">
        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                {t('city.label')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('city.placeholder')}
                  className="h-11 text-sm border-gray-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white focus:border-red-500 dark:focus:border-softPink-500 focus:ring-red-500 dark:focus:ring-softPink-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                {t('street.label')}
              </FormLabel>
              <FormControl>
                <textarea
                  placeholder={t('street.placeholder')}
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white rounded-md resize-none focus:border-red-500 dark:focus:border-softPink-500 focus:ring-1 focus:ring-red-500 dark:focus:ring-softPink-500 focus:outline-none placeholder:text-start"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                {t('phone.label')}
              </FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="EG"
                  placeholder={t('phone.placeholder')}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!form.formState.errors.phone}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />

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
    </Form>
  );
}
