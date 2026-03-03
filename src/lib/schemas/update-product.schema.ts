import { Translations } from '../types/global';
import z from 'zod';

export const updateProductSchema = (t: Translations) => {
  return z.object({
    title: z
      .string(t('validation.title.type'))
      .nonempty(t('validation.title.required')),
    description: z
      .string(t('validation.description.type'))
      .nonempty(t('validation.description.required')),
    price: z.string(t('validation.price.required')),
    discount: z.string(t('validation.discount.type')),
    priceAfterDiscount: z.string(),
    quantity: z.string(t('validation.quantity.required')),
    category: z
      .string(t('validation.category.type'))
      .nonempty(t('validation.category.required')),
    occasion: z
      .string(t('validation.occasion.type'))
      .nonempty(t('validation.occasion.required')),
  });
};
