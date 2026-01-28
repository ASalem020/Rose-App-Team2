'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RememberMeCheckbox from './remember-me/remember-me-checkbox';

import { useTranslations } from 'next-intl';

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  // State for "Remember Me" checkbox
  const [rememberMe, setRememberMe] = useState(false);

  // Translation hook for login page
  const t = useTranslations('pages.login');

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>();

  // Form submit handler
  const onSubmit = async (data: FormData) => {
    try {
      // Fake token for demonstration, replace with API call response
      const token = 'FAKE_TOKEN_FOR_TEST';

      // Save token in localStorage or sessionStorage based on "Remember Me"
      saveAuthToken(token, rememberMe);

      console.log(
        'Logged in with',
        data,
        'Remember Me:',
        rememberMe,
      );
    } catch (err: any) {
      setError('email', {
        message: err.message || 'Something went wrong',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-6"
    >
      <div className="space-y-4">
        {/* Email input */}
        <div className="space-y-1">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            {...register('email', {
              required: t('emailRequired'),
            })}
            type="email"
            id="email"
            placeholder="user@example.com"
            className="h-12 border-2 border-zinc-300"
            autoCapitalize="email"
          />
          {errors.email && (
            <p className="font-sm text-red-400">
              *{errors.email.message}
            </p>
          )}
        </div>

        {/* Password input */}
        <div className="space-y-1">
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            {...register('password', {
              required: t('passwordRequired'),
            })}
            type="password"
            id="password"
            placeholder="*****"
            className="h-12 border-2 border-zinc-300"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="font-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me checkbox + Forgot Password link */}
        <div className="flex items-center justify-between">
          <RememberMeCheckbox
            checked={rememberMe}
            onChange={setRememberMe}
          />
          <Link
            href="/forget-password"
            className="text-maroon-700"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-10 bg-maroon-600 text-white hover:bg-maroon-800"
        >
          {t('login')}
        </Button>
      </div>
    </form>
  );
}
