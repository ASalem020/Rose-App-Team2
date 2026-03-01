import { z } from 'zod';
import { Translations } from '../types/global';

export const addressFormSchema = (t: Translations) => {
  return z.object({
    city: z.string().min(2, t('validation.cityMin')),
    street: z.string().min(3, t('validation.streetMin')),
    phone: z.string().min(10, t('validation.phoneMin')),
  });
};
