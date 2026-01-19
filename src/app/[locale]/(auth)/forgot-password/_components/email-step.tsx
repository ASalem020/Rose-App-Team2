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
      <h2 className="text-2xl font-semibold text-zinc-800">
        {t('pages.forgot-password.header')}
      </h2>

      {/* Subtitle */}
      <p className="w-fit border-b-2 pb-4 text-zinc-800">
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
          {error && <div>{error?.message}</div>}

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
