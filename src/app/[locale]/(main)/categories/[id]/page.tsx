'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormItem,
  FormLabel,
  Form,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { updateCategoryAction } from '../_actions/update-categories.actions';
import {
  useParams,
  useSearchParams,
} from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

type FormValues = {
  name: string;
  image?: FileList;
};

export default function UpdateCategoriesPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const categoryId = params.id as string;

  const form = useForm<FormValues>({
    defaultValues: {
      name: 'Wedding',
    },
  });

  // ✅ يظهر التوست بعد الرجوع من الريدايركت
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Category updated successfully ✅');
    } else if (searchParams.get('error')) {
      toast.error(searchParams.get('error')!);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 p-4">
      <div className="mx-auto w-full max-w-2xl rounded-2xl p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-2xl font-semibold">
          Update Category
        </h2>

        <div className="rounded-xl bg-white p-6">
          <Form {...form}>
            <form
              action={async (formData: FormData) => {
                await updateCategoryAction(
                  categoryId,
                  formData,
                );
              }}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        name="name" // مهم جداً
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={e =>
                          field.onChange(e.target.files)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="h-10 rounded-md bg-maroon-600 font-semibold text-white hover:bg-maroon-800"
              >
                Update Category
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
