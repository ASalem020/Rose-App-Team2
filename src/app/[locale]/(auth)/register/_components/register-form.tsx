'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFields } from '../_types/register-fields';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { registerSchema } from '@/lib/schema/auth.schema';
import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useRegister from '../_hooks/use-register';


export default function RegisterForm() {
  // Translations
  const t = useTranslations('pages.register');
  const locale = useLocale();

  // States 
  const [backendError, setBackendError] = useState('')

  // Hooks
  const { isLoading, mutateAsync } = useRegister();

  // Forms
  const form = useForm<RegisterFields>({
    defaultValues: {
      name: {
        firstName: '',
        lastName: ''
      },
      email: '',
      phone: '',
      gender: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'all',
    resolver: zodResolver(registerSchema(t))
  })

  // Functions
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    try {
      await mutateAsync({ values });
      toast.success(t('toast.success'));
      form.reset();
    } catch (e) {
      // TODO: Until get backend error component
      setBackendError((e as Error).message)
    }
  }

  // Effects
  useEffect(() => {
    if (backendError === '') return;

    const errorTimer = setTimeout(() => {
      setBackendError('');
    }, 3000)

    return () => clearTimeout(errorTimer)
  }, [backendError])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 border-y-2 border-zinc-200 py-6'>
        {/* Name */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {/* First Name */}
          <FormField
            control={form.control}
            name="name.firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('first-name')}</FormLabel>
                <FormControl>
                  <Input type='text' placeholder={t('placeholders.first-name')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="name.lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('last-name')}</FormLabel>
                <FormControl>
                  <Input type='text' placeholder={t('placeholders.last-name')} {...field} />
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
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input type='email' placeholder='user@example.com' {...field} />
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
              <FormLabel>{t('phone')}</FormLabel>
              <FormControl>
                <PhoneInput defaultCountry='EG' {...field} />
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
              <FormLabel>{t('gender.label')}</FormLabel>
              <Select dir={locale === 'ar' ? 'rtl' : 'ltr'} value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t("placeholders.gender")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper">
                  <SelectItem value="male">
                    {t('gender.male')}
                  </SelectItem>
                  <SelectItem value="female">
                    {t('gender.female')}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input type='password' placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirm-password')}</FormLabel>
              <FormControl>
                <Input type='password' placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Backend Error Box */}
        {backendError && (
          <div className='bg-maroon-500/20 border-2 border-maroon-700 py-2 text-center text-sm text-maroon-700 rounded-lg'>
            {backendError}
          </div>
        )}

        {/* Submit Button */}
        <Button type='submit' disabled={isLoading}>
          {isLoading ? t('create-button.loading') : t('create-button.create')}
        </Button>
      </form>
    </Form>
  )
}