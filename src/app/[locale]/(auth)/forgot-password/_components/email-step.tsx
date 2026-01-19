'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { emailSchema } from '@/lib/schemas/auth.schema';
import { Link } from '@/i18n/navigation';
import { useSendOtp } from '../_hooks/use-send-otp';
import { EmailStepFields } from '@/lib/types/auth';

interface EmailStepProps {
  setEmail: (email: string) => void;
}

export default function EmailStep({
  setEmail,
}: EmailStepProps) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Mutations
  const { sendOtp, isPending, error } = useSendOtp();

  // Forms
  const forgotForm = useForm<EmailStepFields>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema(t)),
  });

  // Handlers
  const handleContinue: SubmitHandler<
    EmailStepFields
  > = async values => {
    sendOtp(values, {
      onSuccess: () => {
        // NOTE => Go to next step (OTP step) , to be continue...
        setEmail(values.email);
      },
    });
  };

  return (
    // NOTE => waiting layout to be completed...
    <div className="m-auto flex h-screen max-w-104 flex-col justify-center">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
        {t('pages.forgot-password.header')}
      </h2>

      {/* Subtitle */}
      <p className="border-b-2 pb-4 text-zinc-800 dark:text-zinc-50">
        {t('pages.forgot-password.subtitle')}
      </p>

      {/* Form */}
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

                {/* Input */}
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

          {/* Error message */}
          {error && (
            <div className="w-full rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-softPink-100">
              <p className="text-sm text-red-600 dark:text-red-700">
                {/* Static error message for arabic*/}
                {locale === 'ar'
                  ? `لا يوجد حساب مرتبط بعنوان البريد الإلكتروني ${forgotForm.getValues('email')} `
                  : error.message}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            loading={isPending}
            className="w-full"
            type="submit"
          >
            {t('pages.forgot-password.button')}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <div className="mt-5 text-center text-sm">
        {t.rich('pages.forgot-password.footer', {
          link: (chunk: React.ReactNode) => (
            <Link
              href="/register"
              className="font-bold text-maroon-700 dark:text-softPink-300"
            >
              {chunk}
            </Link>
          ),
        })}
      </div>
    </div>
  );
}
