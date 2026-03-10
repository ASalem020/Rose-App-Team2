import { Translations } from '../types/global';
import z from 'zod';

export const registerSchema = (t: Translations) => {
  return z
    .object({
      name: z.object({
        firstName: z
          .string(t('validation.name.type'))
          .nonempty(
            t('validation.name.first-name-requested'),
          ),
        lastName: z
          .string(t('validation.name.type'))
          .nonempty(
            t('validation.name.last-name-requested'),
          ),
      }),
      email: z
        .email(t('validation.email.type'))
        .nonempty(t('validation.email.required')),
      phone: z
        .string()
        .nonempty(t('validation.phone.required'))
        .min(10, t('validation.phone.type')),
      gender: z.union(
        [
          z.literal('male'),
          z.literal('female'),
          z.literal(''),
        ],
        'Gender must be Male or Female only',
      ),
      password: z
        .string()
        .nonempty(t('validation.password.required'))
        .regex(
          /(?=.*?[A-Z])/,
          t('validation.password.uppercase'),
        )
        .regex(
          /(?=.*?[a-z])/,
          t('validation.password.lowercase'),
        )
        .regex(
          /(?=.*?[0-9])/,
          t('validation.password.numbers'),
        )
        .regex(
          /(?=.*?[#?!@$%^&*-])/,
          t('validation.password.special-characters'),
        )
        .min(8, t('validation.password.min')),
      confirmPassword: z
        .string(t('validation.confirm-password.type'))
        .nonempty(
          t('validation.confirm-password.required'),
        ),
    })
    .refine(
      values => values.password === values.confirmPassword,
      {
        error: t('validation.password-matched'),
        path: ['confirmPassword'],
      },
    );
};
