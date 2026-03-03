'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { useLocale, useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import { UpdateProductFields } from '@/app/[locale]/(auth)/register/_types/product-fields';
import useAllCategories from '@/hooks/use-all-category';
import useAllOccasions from '@/hooks/use-all-occasions';
import { useEffect } from 'react';
import { Product } from '@/lib/types/product';
import { useUpdateProduct } from '../_hooks/use-update-product';
import { updateProductSchema } from '@/lib/schemas/update-product.schema';
import { Link } from '@/i18n/navigation';
import { Image as ImageIcon, Images } from 'lucide-react';

type Props = {
  product: Product;
};

export default function UpdateProductForm({
  product,
}: Props) {
  // Translations
  const t = useTranslations(
    'pages.dashboard.products.update-product.form',
  );
  const locale = useLocale();

  // Query
  const { categories } = useAllCategories();
  const { occasions } = useAllOccasions();

  // Hooks
  const { isLoading, mutateAsync: updateProduct } =
    useUpdateProduct(product._id);

  // Forms
  const form = useForm<UpdateProductFields>({
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      discount: product.discount.toString(),
      priceAfterDiscount:
        product.priceAfterDiscount.toString(),
      quantity: product.quantity.toString(),
      category: product.category,
      occasion: product.occasion,
    },
    mode: 'onSubmit',
    resolver: zodResolver(updateProductSchema(t)),
  });

  // Form methods
  const { watch, setValue } = form;

  // Watch price and discount
  const price = watch('price');
  const discount = watch('discount');

  // Functions
  const onSubmit: SubmitHandler<
    UpdateProductFields
  > = async values => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { discount, occasion, ...rest } = values;

      await updateProduct(rest as UpdateProductFields);
      toast.success(t('success-toast'));
      // form.reset();
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : t('error-toast'),
      );
    }
  };
  // Automatically calculate price After Discount
  useEffect(() => {
    const priceNum = Number(price) || 0;
    const discountNum = Number(discount) || 0;

    if (priceNum && discountNum) {
      const discounted =
        priceNum - (priceNum * discountNum) / 100;
      setValue('priceAfterDiscount', discounted.toString());
    } else {
      setValue('priceAfterDiscount', priceNum.toString());
    }
  }, [price, discount, setValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-2/3 flex-col gap-5 rounded-2xl border-zinc-200 p-6"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('title-label')}
                <span className="ms-0.5 text-red-600">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t('title-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('description-label')}
                <span className="ms-0.5 text-red-600">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={7}
                  placeholder={t('description-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full gap-2">
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  {t('price-label')}
                  <span className="ms-0.5 text-red-600">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t('price-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t('discount-label')}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t('discount-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price after discount */}
          <FormField
            control={form.control}
            name="priceAfterDiscount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>
                  {t('price-after-discount-label')}
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-100"
                    type="number"
                    readOnly
                    placeholder={t(
                      'price-after-discount-placeholder',
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('quantity-label')}
                <span className="ms-0.5 text-red-600">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t('quantity-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categories */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('category-label')}
                <span className="ms-0.5 text-red-600">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Select
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          'select-placeholder',
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    {categories?.map(category => (
                      <SelectItem
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Occasions */}
        <FormField
          control={form.control}
          name="occasion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('occasion-label')}
                <span className="ms-0.5 text-red-600">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Select
                  dir={locale === 'ar' ? 'rtl' : 'ltr'}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          'select-placeholder',
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper">
                    {occasions?.map(occasion => (
                      <SelectItem
                        key={occasion._id}
                        value={occasion._id}
                      >
                        {occasion.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Waiting for cover and images routes... */}
        <div className="flex justify-end gap-2">
          <Link
            href={`/dashboard/products/${product._id}/cover`}
            className="flex items-center gap-1 rounded-lg border border-zinc-200 p-2 text-sm text-blue-600"
          >
            <ImageIcon size={18} /> View Product Cover
          </Link>
          <Link
            href={`/dashboard/products/${product._id}/images`}
            className="flex items-center gap-1 rounded-lg border border-zinc-200 p-2 text-sm text-blue-600"
          >
            <Images size={18} /> View Product Images
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          loading={isLoading}
          className="mt-32 capitalize"
        >
          {t('submit-btn')}
        </Button>
      </form>
    </Form>
  );
}
