'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import type { AddressFormData } from '../../../lib/types/address';

const addressFormSchema = z.object({
  city: z.string().min(2, 'City must be at least 2 characters'),
  street: z.string().min(3, 'Address must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type FormValues = z.infer<typeof addressFormSchema>;

interface AddressFormProps {
  initialData?: AddressFormData | null;
  onSubmit: (data: AddressFormData) => void;
  onCancel: () => void;
  defaultPhone?: string;
}

export default function AddressForm({
  initialData,
  onSubmit,
  onCancel,
  defaultPhone = '',
}: AddressFormProps) {
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

  const onFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      name: initialData?.name || '',
      id: initialData?.id,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="mb-2 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {initialData?.id ? 'Update Address' : 'Add a New Address'}
        </h2>

        {/* Step Progress Bar */}
        <div className="flex items-center gap-0 mb-3">
          {/* Step 1 - active line */}
          <div className="flex-1 h-1 bg-red-500 rounded-full"></div>
          {/* Step 1 badge */}
          <div className="relative -mx-1 z-10">
            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
              1
            </div>
          </div>
          {/* Step 2 - inactive line */}
          <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
          {/* Step 2 badge */}
          <div className="relative -mx-1 z-10">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
              2
            </div>
          </div>
        </div>

        <p className="text-red-500 font-medium text-sm">Enter address details</p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        {/* City */}
        <div>
          <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1.5 block">
            City
          </Label>
          <Input
            id="city"
            placeholder="Enter city name"
            {...register('city')}
            className="h-11 text-sm border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* Address (textarea) */}
        <div>
          <Label htmlFor="street" className="text-sm font-medium text-gray-700 mb-1.5 block">
            Address
          </Label>
          <textarea
            id="street"
            placeholder="Enter your full address"
            {...register('street')}
            rows={4}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none"
          />
          {errors.street && (
            <p className="text-xs text-red-500 mt-1">{errors.street.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1.5 block">
            Phone
          </Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                defaultCountry="EG"
                placeholder="Phone number"
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

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-12 bg-[#8B1A1A] hover:bg-[#721616] text-white font-medium rounded-lg text-base"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
