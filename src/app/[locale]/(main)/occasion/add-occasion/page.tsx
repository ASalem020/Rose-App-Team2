'use client';


// Imports


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { addOccasionSchema, AddOccasionFormData } from '@/lib/schemas/occasion.schema';
import { useAddOccasion } from '@/hooks/use-add-occasion';


// Page


export default function AddOccasionPage() {
  const router = useRouter();
  const { addOccasion, isPending, isSuccess } = useAddOccasion();

  // ── Form ────────────────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddOccasionFormData>({
    resolver: zodResolver(addOccasionSchema),
    defaultValues: { name: '' },
  });

  // Watch the image field to show a preview
  const imageFile = watch('image');
  const imagePreview = imageFile instanceof File && imageFile.size > 0
    ? URL.createObjectURL(imageFile)
    : null;

  // Redirect on success
  useEffect(() => {
    if (isSuccess) router.push('/occasion');
  }, [isSuccess, router]);

  // ── Submit handler ──────────────────────────────────────────────────────────

  const onSubmit = (data: AddOccasionFormData) => {
    addOccasion(data);
  };

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
              Add a New Occasion
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Fill in the details below to create a new occasion
            </p>
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800">

          {/* Rose accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-rose-500 to-rose-400" />

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
            <div className="space-y-6">

              {/* ── Name field ── */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="add-occasion-name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="add-occasion-name"
                  placeholder="Enter occasion name"
                  className="h-11"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-xs text-rose-500">{errors.name.message}</p>
                )}
              </div>

              <Separator />

              {/* ── Image upload ── */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Occasion Image <span className="text-rose-500">*</span>
                </Label>

                {imagePreview ? (
                  /* Preview */
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-600">
                    <div className="relative h-52 w-full">
                      <Image
                        src={imagePreview}
                        alt="Image preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Remove overlay button */}
                    <button
                      type="button"
                      onClick={() => setValue('image', undefined)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="border-t border-gray-100 p-2 text-center text-xs text-gray-400 dark:border-zinc-600">
                      Click × to remove and choose a different image
                    </p>
                  </div>
                ) : (
                  /* Drop zone */
                  <label
                    htmlFor="add-occasion-image"
                    className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 transition hover:border-rose-400 hover:bg-rose-50 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-rose-600 dark:hover:bg-rose-950/20"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 transition group-hover:bg-rose-200 dark:bg-rose-950">
                      <ImagePlus className="h-7 w-7 text-rose-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Click to upload a file
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        PNG, JPG, WEBP — max 5 MB
                      </p>
                    </div>
                  </label>
                )}

                {/* Hidden file input — wired to RHF manually */}
                <input
                  id="add-occasion-image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setValue('image', file, { shouldValidate: true });
                  }}
                />
                {errors.image && (
                  <p className="text-xs text-rose-500">{errors.image.message as string}</p>
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
                  {isPending ? 'Creating…' : 'Add Occasion'}
                </Button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
