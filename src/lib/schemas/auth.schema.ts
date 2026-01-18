import { Translations } from '../types/global';
import z from 'zod';

export const emailSchema = (t: Translations) => {
  return z.object({
    email: z.email({
      error: issue =>
        issue.input === ''
          ? t(
              'pages.forgot-password.schemas.email-required',
            )
          : t(
              'pages.forgot-password.schemas.email-invalid',
            ),
    }),
  });
};

export const resetPasswordSchema = (t: Translations) => {
  return z
    .object({
      newPassword: z
        .string()
        .min(
          8,
          t(
            'pages.new-password.schemas.password-min-length',
          ),
        )
        .regex(
          /[a-z]/,
          t(
            'pages.new-password.schemas.password-lowercase',
          ),
        )
        .regex(
          /[A-Z]/,
          t(
            'pages.new-password.schemas.password-uppercase',
          ),
        )
        .regex(
          /\d/,
          t('pages.new-password.schemas.password-number'),
        )
        .regex(
          /[^\w\s]/,
          t('pages.new-password.schemas.password-special'),
        ),
      confirmPassword: z
        .string()
        .min(
          8,
          t(
            'pages.new-password.schemas.password-min-length',
          ),
        )
        .regex(
          /[a-z]/,
          t(
            'pages.new-password.schemas.password-lowercase',
          ),
        )
        .regex(
          /[A-Z]/,
          t(
            'pages.new-password.schemas.password-uppercase',
          ),
        )
        .regex(
          /\d/,
          t('pages.new-password.schemas.password-number'),
        )
        .regex(
          /[^\w\s]/,
          t('pages.new-password.schemas.password-special'),
        ),
    })
    .refine(
      data => data.newPassword === data.confirmPassword,
      {
        message: t(
          'pages.new-password.schemas.match-password',
        ),
        path: ['confirmPassword'],
      },
    );
};
