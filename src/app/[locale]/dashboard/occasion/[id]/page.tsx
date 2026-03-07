'use client';


// Imports


import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';

import { editOccasionSchema, EditOccasionFormData } from '@/lib/schemas/occasion.schema';
import { useGetOccasion } from '@/hooks/use-get-occasion';
import { useUpdateOccasion } from '@/hooks/use-update-occasion';


// Page


/**
 * EditOccasionPage - Form page for updating an existing occasion
 *
 * Features:
 * - Pre-populates form with existing occasion data
 * - Skeleton loading states while data is fetched
 * - View-only image dialog (image cannot be changed on edit)
 * - Zod-validated name field via react-hook-form
 * - Redirects to occasions list on success
 * - Fully translated (EN / AR)
 */
export default function EditOccasionPage() {

  // Translation


  const t = useTranslations('pages.dashboard.occasion.edit');


  // Navigation


  const router = useRouter();


  // State


  const [isReviewOpen, setIsReviewOpen] = useState(false);


  // Hooks


  // HARDCODED for testing — replace with dynamic param when done with fixing the api
  // When clicking edit on any item it shows this page but with the id of the item that is editable
  const id = '69a8babee364ef61405e78dc';

  const { occasion, isLoading } = useGetOccasion(id);
  const { updateOccasion, isPending, isSuccess } = useUpdateOccasion();


  // Form & Validation


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditOccasionFormData>({
    resolver: zodResolver(editOccasionSchema),
    defaultValues: { name: '', image: undefined },
  });


  // Variables


  // next/image only accepts absolute URLs (http/https) or root-relative paths (/).
  // The API sometimes returns a bare filename (e.g. "rose.jpg") instead of a full URL.
  // Passing that directly to <Image src={...}> would throw a runtime error.
  // This flag guards both the "View image" button and the Dialog so neither renders
  // unless the src is actually safe to use.
  const hasValidImage =
    !!occasion?.image &&
    (occasion.image.startsWith('http://') ||
      occasion.image.startsWith('https://') ||
      occasion.image.startsWith('/'));


  // Handlers


  const onSubmit = (data: EditOccasionFormData) => {
    console.log('[EditOccasion] submitting', { id, data });
    updateOccasion({ occasionId: id, fields: data });
  };

  const onInvalid = (errs: unknown) => {
    console.error('[EditOccasion] validation errors', errs);
  };


  // Effects


  // Pre-populate form once occasion data is loaded
  useEffect(() => {
    if (occasion) {
      reset({ name: occasion.name, image: undefined });
    }
  }, [occasion, reset]);

  // Redirect to list after successful update
  useEffect(() => {
    if (isSuccess) router.push('/dashboard/occasion');
  }, [isSuccess, router]);


  // Render


  return (
    <div className=" max-w-5xl space-y-8 ms-10 py-10">

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
          <h1 className="text-xl font-bold">
            {isLoading ? <Skeleton className="h-6 w-48" /> : `${t('heading')}: ${occasion?.name ?? ''}`}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('subheading')}
          </p>
        </div>
      </div>

      {/* Form — shows skeleton while data loads */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">

          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-occasion-name">
              {t('nameLabel')} <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="edit-occasion-name"
              placeholder={t('namePlaceholder')}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-rose-500">{errors.name.message}</p>
            )}
          </div>

          {/* View image link — right aligned, only when image exists */}
          {hasValidImage && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsReviewOpen(true)}
                className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <ImageIcon className="h-4 w-4" />
                {t('viewImage')}
              </button>
            </div>
          )}

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
      )}

      {/* Image Review Dialog */}
      {hasValidImage && (
        <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
          <DialogContent className="overflow-hidden border-none bg-transparent p-0 shadow-none sm:max-w-xl">
            <DialogTitle className="sr-only">Image Review</DialogTitle>
            <div className="relative aspect-video w-full">
              <Image
                src={occasion!.image!}
                fill
                alt={occasion?.name || 'Occasion image'}
                className="rounded-3xl object-contain"
              />
            </div>
            <div className="flex justify-center p-6">
              <Button
                variant="subtle"
                onClick={() => setIsReviewOpen(false)}
                className="rounded-full px-10"
              >
                {t('closeReview')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
