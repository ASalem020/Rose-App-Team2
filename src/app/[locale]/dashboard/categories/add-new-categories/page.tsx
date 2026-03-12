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
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

// type
type FormValues = {
  name: string;
  image?: FileList;
};

export default function AddCategoriesPage() {
  // Transilation
  const t = useTranslations('dashboard.categories');

  // Query
  const queryClient = useQueryClient();

  // Navigation
  const router = useRouter();

  // form
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <div className="ml-3 mt-3 flex min-h-screen flex-col">
      <div className="container max-w-3xl rounded-2xl">
        {/* title */}
        <h2 className="mb-6 text-2xl font-semibold">
          {t('add-new-category')}
        </h2>

        {/* form */}
        <div className="mt-3 h-96 rounded-xl bg-white p-3">
          <Form {...form}>
            {/* function */}
            <form
              action={async (formData: FormData) => {
                const result =
                  await AddCategoryAction(formData);
                if (result.success) {
                  toast.success(result.message);
                  queryClient.invalidateQueries({
                    queryKey: ['categories'],
                  });
                  setTimeout(() => {
                    router.push('/dashboard/categories');
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
                    <FormLabel>
                      {t('name')}{' '}
                      <span className="text-red-600">
                        *
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        name="name"
                        placeholder="Enrter Category Name"
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
                  <FormItem className="-mt-2">
                    <FormLabel>
                      {t('category-image')}{' '}
                      <span className="text-red-600">
                        *
                      </span>
                    </FormLabel>
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
                className="mt-16 h-10 rounded-md bg-maroon-600 font-semibold text-white hover:bg-maroon-800"
              >
                {t('add-category-button')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
