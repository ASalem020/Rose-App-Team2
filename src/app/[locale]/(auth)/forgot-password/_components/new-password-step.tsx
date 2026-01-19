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
import { Link } from '@/i18n/navigation';
import { ResetPasswordFields } from '@/lib/types/auth';
import { resetPasswordSchema } from '@/lib/schemas/auth.schema';
import { useResetPassword } from '../_hooks/use-new-password';
import { toast } from 'sonner';

interface NewPasswordStepProps {
  email: string;
}

export default function NewPasswordStep({
  email,
}: NewPasswordStepProps) {
  // Translation
  const t = useTranslations();

  // Mutations
  const { resetPassword, isPending, error } =
    useResetPassword();

  // Forms
  const newPasswordForm = useForm<ResetPasswordFields>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema(t)),
  });

  // Handlers
  const handleReset: SubmitHandler<
    ResetPasswordFields
  > = async values => {
    resetPassword(
      {
        email,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          toast.success(
            () =>
              'Your password has been successfully reset.',
          );
        },
      },
    );
  };

  return (
    // NOTE => waiting for layout to be completed...
    <div className="m-auto flex h-screen max-w-100 flex-col justify-center">
      <h2 className="text-2xl font-semibold text-zinc-800">
        {t('pages.new-password.header')}
      </h2>
      <p className="border-b-2 pb-4 text-zinc-800">
        {t('pages.new-password.subtitle')}
      </p>

      <Form {...newPasswordForm}>
        <form
          onSubmit={newPasswordForm.handleSubmit(
            handleReset,
          )}
          className="mt-6 flex flex-col gap-4 border-b-2 pb-9"
        >
          {/* Hidden email field */}
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="hidden"
            aria-hidden="true"
          />

          <FormField
            control={newPasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                {/* New password */}
                <FormLabel>
                  {t('common.labels.password')}
                </FormLabel>

                <FormControl>
                  <Input
                    variant={'password'}
                    {...field}
                    placeholder="********"
                    autoComplete="new-password"
                    autoFocus
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={newPasswordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                {/* Confirm new Password */}
                <FormLabel>
                  {t('common.labels.confirmPassword')}
                </FormLabel>

                <FormControl>
                  <Input
                    variant={'password'}
                    {...field}
                    placeholder="********"
                    autoComplete="new-password"
                    autoFocus
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && <div>{error?.message}</div>}

          {/* Submit Button */}
          <Button
            loading={isPending}
            className="mt-5 w-full"
            type="submit"
          >
            {t('pages.new-password.button')}
          </Button>
        </form>
      </Form>

      <div className="mt-5 text-center text-sm">
        {t.rich('pages.new-password.footer', {
          link: (chunk: React.ReactNode) => (
            <Link
              href=""
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
