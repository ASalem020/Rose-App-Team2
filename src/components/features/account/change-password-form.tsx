'use client';


// Imports


import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { CircleUser } from 'lucide-react';

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

import {
  changePasswordFields,
  changePasswordSchema,
} from '@/lib/schemas/profile';
import { changePasswordAction } from '@/lib/actions/account/change-password.actions';


// Types


type Props = {
  /**
   * When provided, shows a "Profile Settings" link at the bottom of the form.
   * Pass the href to the profile route (e.g. "/dashboard/account/profile").
   * Leave undefined to hide the link (e.g. on the main site with a sidebar).
   */
  profileSettingsPath?: string;
};


// Component


/**
 * ChangePasswordForm - Form for updating the user's password
 *
 * Features:
 * - Validates current password, new password and confirmation
 * - Signs the user out on success (API invalidates the old token)
 * - Optional inline "Profile Settings" back-link for sidebar-less layouts
 * - Fully translated (EN / AR)
 *
 * @param profileSettingsPath - Optional href shown as a back-link to profile
 */
export default function ChangePasswordForm({ profileSettingsPath }: Props) {

  // Translation


  const t = useTranslations('pages.profile');


  // Form & Validation


  const form = useForm<changePasswordFields>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });


  // Handlers


  const onSubmit = async (data: changePasswordFields) => {
    const res = await changePasswordAction(data);
    try {
      if (res.message === 'success') {
        // Sign out after password change — the old token is now invalid
        await signOut({ callbackUrl: '/login' });
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      void error;
      toast.error('An unexpected error occurred');
    }
  };


  // Render


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="*:mb-4">

        {/* Current password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.old-password')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.new-password')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm new password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.confirm-new-password')}</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="flex items-center justify-between mt-16">

          {/* Inline profile settings back-link — only shown when no sidebar exists */}
          {profileSettingsPath && (
            <Link
              href={profileSettingsPath}
              className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              <CircleUser className="h-4 w-4" />
              {t('sidebar.my-account')}
            </Link>
          )}

          {/* Right side — primary action */}
          <Button
            className="h-10 bg-maroon-600 text-white rounded-md hover:bg-maroon-800 font-semibold ml-auto"
            disabled={!form.formState.isDirty}
          >
            {t('change-password')}
          </Button>
        </div>

      </form>
    </Form>
  );
}
