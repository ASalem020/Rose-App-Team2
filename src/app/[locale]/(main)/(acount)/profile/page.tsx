'use client';

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
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/ui/phone-input';
import {
  deleteMyAcountAction,
  updateProfileAction,
} from '../_actions/profile.actions';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import {
  profileFields,
  profileFormSchema,
} from '@/lib/schemas/profile';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { DeleteAccountAlert } from './../_components/alert-dialog';
import { useProfileInfo } from '../_hooks/use-profile-info';
import ProfileImage from '../_components/profile-image';

export default function Profile() {
  // ^ translations
  const t = useTranslations('pages.profile');

  //^ hooks
  const router = useRouter();
  const { update, status } = useSession();
  const { userInfo } = useProfileInfo();

  // ^ form
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

  //^ functions
  const updataProfile: SubmitHandler<
    profileFields
  > = async data => {
    const response = await updateProfileAction(data);
    try {
      if (response.message == 'success') {
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
      if (response.message == 'success') {
        toast.success(
          'The account has already been deleted',
        );
        setTimeout(async () => {
          await signOut({
            callbackUrl: '/login',
          });
        }, 1500);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      void error;
      toast.error('An unexpected error occurred');
    }
  };

  //  ^ effect
  useEffect(() => {
    // ^ If you are not a user, we will redirect you to the login page.
    if (status === 'unauthenticated') {
      router.replace('/login');
      return;
    }

    // ^ reset user Info
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updataProfile)}
        className="*:mb-3"
      >
        {/* image profile */}
        <ProfileImage imageUrl={userInfo?.user.photo}/>

        {/* use nam */}
        <div className="flex items-center gap-4 *:w-1/2">
          {/* first name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('user-info.first-name')}
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* last name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('user-info.last-name')}
                </FormLabel>
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
                <PhoneInput
                  defaultCountry="EG"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender Select */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('user-info.gender')}</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="">
                  <SelectValue
                    placeholder={t('user-info.gender')}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">
                      male
                    </SelectItem>
                    <SelectItem value="female">
                      female
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex items-center justify-between">
          <DeleteAccountAlert
            onConfirm={handleDeleteMyAccount}
          />
          <Button className="h-10 rounded-md bg-maroon-600 font-semibold text-white hover:bg-maroon-800">
            {t('save-changes')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
