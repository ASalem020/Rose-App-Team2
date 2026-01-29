'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RememberMeCheckbox from './remember-me/remember-me-checkbox';

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginForm() {
  const t = useTranslations('pages.login');

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const { handleSubmit, watch, setError } = form;

  const rememberMe = watch('rememberMe');

  const onSubmit = async (values: LoginFormValues) => {
    try {
      if (values.rememberMe) {
        // NextAuth login with persistent cookie
        await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        });
      } else {
        // Manual login → sessionStorage only
        const response = await fetch(
          `${process.env.API_URL}/auth/signin`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          },
        );

        const data = await response.json();

        if (response.ok) {
          // Save token in sessionStorage → ends on browser close
          sessionStorage.setItem('token', data.token);
        } else {
          setError('email', {
            message: data.error || 'Login failed',
          });
        }
      }
    } catch (err: any) {
      setError('email', {
        message: err.message || 'Something went wrong',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="user@example.com"
                  className="h-12 border-2 border-zinc-300"
                  autoCapitalize="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="*****"
                  className="h-12 border-2 border-zinc-300"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <RememberMeCheckbox
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Link
            href="/forget-password"
            className="text-maroon-700"
          >
            {t('forgotPassword')}
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="h-10 bg-maroon-600 text-white hover:bg-maroon-800"
        >
          {t('login')}
        </Button>
      </form>
    </Form>
  );
}
