import { Translations } from '../types/global';
import z from 'zod';

export const productSchema = (t: Translations) => {
  return z.object({
    title: z
      .string(t('validation.title.type'))
      .nonempty(t('validation.title.required')),
    description: z
      .string(t('validation.description.type'))
      .nonempty(t('validation.description.required')),
    price: z
      .string(t('validation.price.type'))
      .nonempty(t('validation.price.required'))
      .refine(
        val => !isNaN(Number(val)) && Number(val) > 0,
        {
          message: t('validation.price.required'),
        },
      ),
    discount: z.string(t('validation.discount.type')),
    priceAfterDiscount: z.string(
      t('validation.price-after-discount.type'),
    ),
    quantity: z
      .string(t('validation.quantity.type'))
      .nonempty(t('validation.quantity.required')),
    imgCover: z
      .any()
      .refine(
        file => file instanceof File && file.size > 0,
        {
          message: t('validation.img-cover.required'),
        },
      ),

    images: z
      .custom<FileList | null>()
      .refine(fileList => fileList && fileList.length > 0, {
        message: t('validation.images.required'),
      }),
    category: z
      .string(t('validation.category.type'))
      .nonempty(t('validation.category.required')),
    occasion: z
      .string(t('validation.occasion.type'))
      .nonempty(t('validation.occasion.required')),
  });
};
