// Michael Samy's Component

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
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { emailSchema } from '@/lib/schemas/auth.schema';
import { Link } from '@/i18n/navigation';
import { useSendOtp } from '../_hooks/use-send-otp';
import {
  EmailStepFields,
  ForgotPasswordStep,
} from '@/lib/types/auth';
import {
  COOLDOWN_DURATION,
  COOLDOWN_KEY,
  getRemainingTime,
} from '../_utils/otp-utils';

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  setStep: (step: ForgotPasswordStep) => void;
}

export default function EmailStep({
  email,
  setEmail,
  setStep,
}: EmailStepProps) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // State
  const [countdown, setCountdown] = useState(0);

  // Mutation
  const { sendOtp, isPending, error } = useSendOtp();

  // Forms
  const forgotForm = useForm<EmailStepFields>({
    defaultValues: {
      email: email || '',
    },
    resolver: zodResolver(emailSchema(t)),
  });

  // Handlers
  const handleContinue: SubmitHandler<
    EmailStepFields
  > = async values => {
    // If timer is running then go to next step without sending another OTP
    if (localStorage.getItem(COOLDOWN_KEY)) {
      // NOTE => Go to next step (OTP step) , to be continue...
      // return;
      setEmail(values.email);
      setStep('otp');
    } else {
      // NOTE => Go to next step (OTP step) , to be continue...
      // If timer is not running then send OTP and go to next step
      sendOtp(values, {
        onSuccess: () => {
          setEmail(values.email);
          localStorage.setItem(
            COOLDOWN_KEY,
            Date.now().toString(),
          );
          setCountdown(COOLDOWN_DURATION);
          setStep('otp');
        },
      });
    }
  };

  // Effects
  useEffect(() => {
    // Initialize countdown from localStorage on mount
    const remaining = getRemainingTime();
    setCountdown(remaining);
  }, []);

  useEffect(() => {
    // Countdown timer
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      const remaining = getRemainingTime();
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
        localStorage.removeItem(COOLDOWN_KEY);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    // NOTE => waiting layout to be completed...
    <div className="m-auto flex max-w-104 flex-col justify-center">
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
