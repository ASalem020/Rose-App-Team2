'use client';


// Imports


import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { addOccasionSchema, AddOccasionFormData } from '@/lib/schemas/occasion.schema';
import { useAddOccasion } from '@/hooks/use-add-occasion';


// Page


/**
 * AddOccasionPage - Form page for creating a new occasion
 *
 * Features:
 * - Zod-validated form via react-hook-form
 * - File upload for occasion image
 * - Redirects to occasions list on success
 * - Fully translated (EN / AR)
 */
export default function AddOccasionPage() {

  // Translation


  const t = useTranslations('pages.dashboard.occasion.add');


  // Navigation


  const router = useRouter();


  // Hooks


  const { addOccasion, isPending, isSuccess } = useAddOccasion();


  // Form & Validation


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddOccasionFormData>({
    resolver: zodResolver(addOccasionSchema),
    defaultValues: { name: '', image: undefined },
  });


  // Handlers


  const onSubmit = (data: AddOccasionFormData) => {
    addOccasion(data);
  };


  // Effects


  // Redirect to list after successful creation
  useEffect(() => {
    if (isSuccess) router.push('/dashboard/occasion');
  }, [isSuccess, router]);


  // Render


  return (
    <div className=" max-w-5xl space-y-8 px-4 py-10">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 rounded-full border"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">{t('heading')}</h1>
          <p className="text-sm text-muted-foreground">
            {t('subheading')}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="add-occasion-name">
            {t('nameLabel')} <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="add-occasion-name"
            placeholder={t('namePlaceholder')}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-xs text-rose-500">{errors.name.message}</p>
          )}
        </div>

        {/* Occasion Image */}
        <div className="space-y-1.5">
          <Label htmlFor="add-occasion-image">
            {t('imageLabel')} <span className="text-rose-500">*</span>
          </Label>

          {/* Registers the file into RHF without keeping a stale value in the input */}
          <Input
            id="add-occasion-image"
            type="file"
            accept="image/*"
            uploadLabel={t('uploadLabel')}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue('image', file, { shouldValidate: true });
              e.target.value = '';
            }}
          />
          {errors.image && (
            <p className="text-xs text-rose-500">
              {errors.image.message as string}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="flex-1 bg-rose-600 text-white hover:bg-rose-700"
            disabled={isPending}
          >
            {isPending ? t('submitting') : t('submit')}
          </Button>
        </div>

      </form>
    </div>
  );
}
