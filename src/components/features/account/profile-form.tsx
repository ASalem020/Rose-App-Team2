'use client';


// Imports


import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import { Lock } from 'lucide-react';

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
import { PhoneInput } from '@/components/ui/phone-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { profileFields, profileFormSchema } from '@/lib/schemas/profile';
import {
  updateProfileAction,
  deleteMyAcountAction,
} from '@/lib/actions/account/profile.actions';
import { useProfileInfo } from '@/hooks/use-profile-info';

import ProfileImage from './profile-image';
import { DeleteAccountAlert } from './delete-account-alert';


// Types


type Props = {
  /**
   * When provided, shows a "Change Password" link at the bottom of the form.
   * Pass the href to the change-password route (e.g. "/dashboard/account/change-password").
   * Leave undefined to hide the link (e.g. on the main site where password is in the sidebar).
   */
  changePasswordPath?: string;
};


// Component


/**
 * ProfileForm - Full profile editing form
 *
 * Features:
 * - Pre-populates fields with existing user data
 * - Uploads profile picture via ProfileImage component
 * - Handles account deletion with a confirmation dialog
 * - Optional inline "Change Password" link for layouts without a sidebar
 * - Redirects unauthenticated users to /login
 * - Fully translated (EN / AR)
 *
 * @param changePasswordPath - Optional href shown as a link next to Delete My Account
 */
export default function ProfileForm({ changePasswordPath }: Props) {

  // Translation


  const t = useTranslations('pages.profile');


  // Navigation


  const router = useRouter();


  // Hooks


  const { update, status } = useSession();
  const { userInfo } = useProfileInfo();


  // Form & Validation


  const form = useForm<profileFields>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
    },
  });


  // Handlers


  const onSubmit: SubmitHandler<profileFields> = async data => {
    const response = await updateProfileAction(data);
    try {
      if (response.message === 'success') {
        toast.success(response.message);
        await update();
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      void error;
      toast.error(response.error);
    }
  };

  const handleDeleteMyAccount = async () => {
    const response = await deleteMyAcountAction();
    try {
      if (response.message === 'success') {
        toast.success('The account has already been deleted');
        setTimeout(async () => {
          await signOut({ callbackUrl: '/login' });
        }, 1500);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      void error;
      toast.error('An unexpected error occurred');
    }
  };


  // Effects


  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
      return;
    }

    // Pre-fill form once profile data loads
    if (userInfo?.user) {
      form.reset({
        firstName: userInfo.user.firstName,
        lastName: userInfo.user.lastName,
        email: userInfo.user.email,
        phone: userInfo.user.phone,
        gender: userInfo.user.gender as 'male' | 'female',
      });
    }
  }, [status, userInfo, form, router]);


  // Render


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="*:mb-3">

        {/* Profile Picture */}
        <ProfileImage imageUrl={userInfo?.user.photo} />

        {/* Name row */}
        <div className="flex items-center gap-4 *:w-1/2">

          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('user-info.first-name')}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('user-info.last-name')}</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.email')}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.phone')}</FormLabel>
              <FormControl>
                <PhoneInput defaultCountry="EG" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.gender')}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder={t('user-info.gender')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">male</SelectItem>
                    <SelectItem value="female">female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Actions */}
        <div className="mt-16 flex items-center justify-between">

          {/* Left side — destructive / secondary actions */}
          <div className="flex items-center gap-4">
            <DeleteAccountAlert onConfirm={handleDeleteMyAccount} />

            {/* Inline change-password link — only shown when no sidebar exists */}
            {changePasswordPath && (
              <Link
                href={changePasswordPath}
                className="flex items-center gap-1.5 text-sm font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                <Lock className="h-4 w-4" />
                {t('sidebar.change-password')}
              </Link>
            )}
          </div>

          {/* Right side — primary action */}
          <Button className="h-10 rounded-md bg-maroon-600 font-semibold text-white hover:bg-maroon-800">
            {t('save-changes')}
          </Button>
        </div>

      </form>
    </Form>
  );
}
