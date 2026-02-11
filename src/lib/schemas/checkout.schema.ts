import z from 'zod';
import { Translations } from '../types/global';

export const validCoupon = (t: Translations) => {
  return z.object({
    coupon: z
      .string()
      .min(1, t('validation.coupon.required')),
  });
};
