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
import { toast } from 'sonner';
import { AddCategoryAction } from '../_actions/add-categories.actions';
import { useRouter } from '@/i18n/navigation';

type FormValues = {
  name: string;
  image?: FileList;
};

export default function AddCategoriesPage() {
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 p-4">
      <div className="mx-auto w-full max-w-2xl rounded-2xl p-6 shadow-sm md:p-8">
        {/* title */}
        <h2 className="mb-6 text-2xl font-semibold">
          Add a New Categories
        </h2>

        <div className="rounded-xl bg-white p-6">
          <Form {...form}>
            <form
              action={async (formData: FormData) => {
                const result =
                  await AddCategoryAction(formData);
                if (result.success) {
                  toast.success(result.message);
                  setTimeout(() => {
                    router.push('/categories');
                  }, 1000);
                } else {
                  toast.error(result.message);
                }
              }}
              className="flex flex-col gap-6"
            >
              {/* name input */}
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
                        name="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* image input */}
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

              {/* Button */}
              <Button
                type="submit"
                className="h-10 rounded-md bg-maroon-600 font-semibold text-white hover:bg-maroon-800"
              >
                Add Category
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
