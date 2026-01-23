'use client'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFields } from '../_types/register-fields';
// import { addUser } from '../_actions/add-user.action';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useLocale, useTranslations } from 'next-intl';
import ErrorMessage from '@/components/shared/error-message';
import { addUser } from '../_actions/add-user.action';
import { toast } from 'sonner';
import { registerSchema } from '@/lib/schema/auth.schema';
import { useEffect, useState } from 'react';


export default function RegisterForm() {
  // Translations
  const t = useTranslations('pages.register');
  const locale = useLocale();

  // States 
  const [backendError, setBackendError] = useState('')

  // Forms
  const { register, handleSubmit, control, formState: { isSubmitting, errors }, reset } = useForm<RegisterFields>({
    defaultValues: {
      name: {
        firstName: '',
        lastName: ''
      },
      email: '',
      phone: '',
      gender: 'male',
      password: '',
      confirmPassword: ''
    },
    mode: 'all',
    resolver: zodResolver(registerSchema(t))
  })

  // Functions
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    try {
      await addUser({ values });
      toast.success('Creating Account Successfully, login now!');
      reset();
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 border-y-2 border-zinc-200 py-6'>
      {/* Name */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {/* First Name */}
        <div className="first-name">
          <Label htmlFor='firstName'>{t('first-name')}</Label>
          <Input type='text' id='firstName' placeholder={t('placeholders.first-name')} {...register('name.firstName')} />
          {errors.name?.firstName && <ErrorMessage message={errors.name.firstName.message} />}
        </div>
        {/* Last Name */}
        <div className="last-name">
          <Label htmlFor='lastName'>{t('last-name')}</Label>
          <Input type='text' id='lastName' placeholder={t('placeholders.last-name')} {...register('name.lastName')} />
          {errors.name?.lastName && <ErrorMessage message={errors.name.lastName.message} />}
        </div>
      </div>

      {/* Email */}
      <div className='email'>
        <Label htmlFor='email'>{t('email')}</Label>
        <Input type='email' id='email' placeholder='user@example.com' {...register('email')} />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>

      {/* Phone */}
      <div className="phone">
        <Label htmlFor='phone'>{t('phone')}</Label>
        <Controller name='phone' control={control} render={({ field }) => {
          return <PhoneInput id='phone' defaultCountry='EG' name={field.name} onChange={field.onChange} />
        }} />
        {errors.phone && <ErrorMessage message={errors.phone.message} />}
      </div>

      {/* Select */}
      <div className="select">
        <Label htmlFor='select'>{t('gender.label')}</Label>
        <Controller control={control} name='gender' render={({ field }) => {
          return (
            <Select dir={locale === 'ar' ? 'rtl' : 'ltr'} value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder={t("gender.label")} />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="male">
                  {t('gender.male')}
                </SelectItem>
                <SelectItem value="female">
                  {t('gender.female')}
                </SelectItem>
              </SelectContent>
            </Select>
          )
        }} />
        {errors.gender && <ErrorMessage message={errors.gender.message} />}
      </div>

      {/* Password */}
      <div className="pass">
        <Label htmlFor='password'>{t('password')}</Label>
        <Input type='password' id='password' placeholder='**********' {...register('password')} />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      {/* Confirm Password */}
      <div className="confirm-pass">
        <Label htmlFor='confirmPass'>{t('confirm-password')}</Label>
        <Input type='password' id='confirmPass' placeholder='**********' {...register('confirmPassword')} />
        {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
      </div>

      {/* Backend Error Box */}
      {
        backendError && <div className='bg-maroon-500/20 border-2 border-maroon-700 py-2 text-center text-sm text-maroon-700 rounded-lg'>
          {backendError}
        </div>
      }

      {/* Submit Button */}
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? t('create-button.loading') : t('create-button.create')}
      </Button>
    </form>
  )
}