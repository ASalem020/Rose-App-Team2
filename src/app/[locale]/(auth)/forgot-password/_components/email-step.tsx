'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { emailSchema } from '@/lib/schemas/auth.schema';
import { Link } from '@/i18n/navigation';

export default function EmailStep() {
  // Translation
  const t = useTranslations('');

  // Forms
  const forgotForm = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema(t)),
  });

  const handleContinue: SubmitHandler<{
    email: string;
  }> = async values => {};

  return (
    // NOTE => h-screen here is for testing UI only , waiting layout to be completed...
    <div className="m-auto flex h-screen w-fit flex-col justify-center">
      <h2 className="text-2xl font-semibold text-zinc-800">
        {t('pages.forgot-password.header')}
      </h2>
      <p className="w-fit border-b-2 pb-4 text-zinc-800">
        {t('pages.forgot-password.subtitle')}
      </p>

      <Form {...forgotForm}>
        <form
          onSubmit={forgotForm.handleSubmit(handleContinue)}
          className="mt-6 space-y-10 border-b-2 pb-9"
        >
          <FormField
            control={forgotForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* Email */}
                <FormLabel>
                  {t('common.labels.email')}
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="user@example.com"
                    autoComplete="email"
                    autoFocus
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            {t('pages.forgot-password.button')}
          </Button>
        </form>
      </Form>

      <div className="mt-5 text-center text-sm">
        {t.rich('pages.forgot-password.footer', {
          link: chunk => (
            <Link
              href="/register"
              className="font-bold text-maroon-700 dark:text-maroon-300"
            >
              {chunk}
            </Link>
          ),
        })}
      </div>
    </div>
  );
}
