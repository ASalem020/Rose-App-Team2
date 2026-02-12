import z from 'zod';
import { Translations } from '../types/global';

export const applyCouponSchema = (t: Translations) => {
  return z.object({
    coupon: z
      .string()
      .min(1, t('checkout.validation.coupon.required')),
  });
};

export const checkoutSchema = (t: Translations) => {
  return z.object({
    shippingAddress: z.object({
      street: z
        .string()
        .min(1, t('checkout.validation.address.required')),
      phone: z
        .string()
        .min(
          1,
          t(
            'checkout.validation.shippingAddress.phone.required',
          ),
        ),
      city: z
        .string()
        .min(
          1,
          t(
            'checkout.validation.shippingAddress.city.required',
          ),
        ),
      lat: z.string(),
      long: z.string(),
    }),
    'payment-method': z
      .string()
      .min(
        1,
        t('checkout.validation.payment-method.required'),
      ),
  });
};
