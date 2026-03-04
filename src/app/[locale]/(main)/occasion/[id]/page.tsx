'use client';


// Imports


import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { editOccasionSchema, EditOccasionFormData } from '@/lib/schemas/occasion.schema';
import { useGetOccasion } from '@/hooks/use-get-occasion';
import { useUpdateOccasion } from '@/hooks/use-update-occasion';


// Page


export default function EditOccasionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { occasion, isLoading } = useGetOccasion(id);
  const { updateOccasion, isPending, isSuccess } = useUpdateOccasion();

  // ── Form ────────────────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditOccasionFormData>({
    resolver: zodResolver(editOccasionSchema),
    defaultValues: { name: '' },
  });

  // Pre-populate form once occasion data is loaded
  useEffect(() => {
    if (occasion) {
      reset({ name: occasion.name });
    }
  }, [occasion, reset]);

  // Redirect on success
  useEffect(() => {
    if (isSuccess) router.push('/occasion');
  }, [isSuccess, router]);

  // ── Submit handler ──────────────────────────────────────────────────────────

  const onSubmit = (data: EditOccasionFormData) => {
    updateOccasion({ occasionId: id, fields: data });
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const name = watch('name');

  /** True when the image value from the API is a usable URL */
  const hasValidImage =
    !!occasion?.image &&
    (occasion.image.startsWith('http://') ||
      occasion.image.startsWith('https://') ||
      occasion.image.startsWith('/'));

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-2xl px-4 py-10">

        {/* ── Header ── */}
        <div className="mb-8 flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 shrink-0 rounded-full border border-gray-200 dark:border-zinc-700"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {isLoading ? (
                <Skeleton className="h-6 w-48" />
              ) : (
                `Update Occasion: ${name}`
              )}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Edit the name of this occasion
            </p>
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">

          {/* Rose accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-rose-500 to-rose-400" />

          <div className="p-6 sm:p-8">
            {isLoading ? (
              /* Loading skeletons */
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-11 w-full rounded-lg" />
                </div>
                <Skeleton className="h-px w-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-52 w-full rounded-xl" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 flex-1 rounded-xl" />
                  <Skeleton className="h-10 flex-1 rounded-xl" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* ── Name field ── */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="edit-occasion-name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="edit-occasion-name"
                    placeholder="Occasion name"
                    className="h-11"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500">{errors.name.message}</p>
                  )}
                </div>

                <Separator />

                {/* ── Image (view only) ── */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Occasion Image
                  </Label>

                  {hasValidImage ? (
                    /* Read-only image preview */
                    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-600">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={occasion!.image}
                        alt={name}
                        className="h-52 w-full object-cover"
                      />
                      <p className="border-t border-gray-100 px-4 py-2 text-center text-xs text-gray-400 dark:border-zinc-600">
                        Viewing current occasion image
                      </p>
                    </div>
                  ) : (
                    /* No valid image from API */
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-10 dark:border-zinc-600 dark:bg-zinc-900">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700">
                        <ImageIcon className="h-7 w-7 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400">
                        No image available for this occasion
                      </p>
                    </div>
                  )}
                </div>

                {/* ── Actions ── */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.back()}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-rose-600 text-white hover:bg-rose-700"
                    disabled={isPending}
                  >
                    {isPending ? 'Saving…' : 'Update Occasion'}
                  </Button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
