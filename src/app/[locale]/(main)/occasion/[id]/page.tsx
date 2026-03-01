'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditOccasionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [name, setName] = useState('');
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Fetch existing data ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/occasions/${id}`,
        );
        const json = await res.json();
        const occasion = json.occasion ?? json;
        setName(occasion.name ?? '');
        setExistingImage(occasion.image ?? null);
      } catch {
        toast.error('Could not load occasion data');
      } finally {
        setIsFetching(false);
      }
    })();
  }, [id]);

  // ── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter an occasion name');
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/occasions/${id}`,
        { method: 'PUT', body: formData },
      );
      if (!res.ok) throw new Error();

      toast.success('Occasion updated successfully!');
      router.push('/occasion');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────

  /** True when the image value from the API is a usable URL */
  const hasValidImage =
    !!existingImage &&
    (existingImage.startsWith('http://') ||
      existingImage.startsWith('https://') ||
      existingImage.startsWith('/'));

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
              {isFetching ? (
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
            {isFetching ? (
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
              <form onSubmit={handleSubmit} className="space-y-6">

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
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="h-11"
                  />
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
                        src={existingImage!}
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
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-rose-600 text-white hover:bg-rose-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving…' : 'Update Occasion'}
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
