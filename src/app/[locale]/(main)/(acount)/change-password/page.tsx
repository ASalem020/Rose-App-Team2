'use client';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormItem,
  FormLabel,
  Form,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { changePasswordAction } from '../_actions/change-password.actions';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { changePasswordFields, changePasswordSchema } from '@/lib/schemas/profile';
import { useTranslations } from 'next-intl';

export default function ChangePassword() {
  // ^ translations
 const t = useTranslations('pages.profile');

  // ^ form
  const form = useForm<changePasswordFields>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // ^ functions
  const handleChangePassword = async (data: changePasswordFields) => {
    //^ Do something with the form values.
    const res = await changePasswordAction(data);
    console.log(res);
    try {
      if (res.message == 'success') {
        await signOut({
          callbackUrl: '/login',
        });
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      void error;
      toast.error('An unexpected error occurred');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangePassword)}
        className="*:mb-4"
      >
        {/* old password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.Old-Password')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* new password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.New-Password')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* confirm password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.Confirm-New-Password')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end mt-16">
          <Button className="h-10 bg-maroon-600 text-white rounded-md hover:bg-maroon-800 font-semibold ">
            {t('Change-Password')}
          </Button>
        </div>

      </form>
    </Form>
  );
}
