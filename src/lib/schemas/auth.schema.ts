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

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      'Password must contain at least one capital letter, a number, and a symbol.',
    ),
});

export const otpSchema = (t: Translations) => {
  return z.object({
    code: z
      .string()
      .min(
        1,
        t(
          'pages.forgot-password.otp.schemas.code-required',
        ),
      )
      .length(
        6,
        t('pages.forgot-password.otp.schemas.code-length'),
      ),
  });
};

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
