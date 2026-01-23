'use client'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../_schema/register-form.schema';
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


export default function RegisterForm() {
  // Translations
  const t = useTranslations('pages.register');
  const locale = useLocale()

  // Forms
  const { register, handleSubmit, control, formState: { isSubmitting, errors } } = useForm<RegisterFields>({
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
    resolver: zodResolver(registerSchema)
  })

  // Functions
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    try {
      await addUser({ values });
      toast.success('Creating Account Success');
    } catch (e) { console.log((e as Error).message) }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 border-y-2 border-zinc-200 py-6'>
      {/* Name */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {/* First Name */}
        <div className="first-name">
          <Label htmlFor='firstName'>{t('first-name')}</Label>
          <Input type='text' id='firstName' placeholder='Jonathan' {...register('name.firstName')} />
          {errors.name?.firstName && <ErrorMessage message={errors.name.firstName.message} />}
        </div>
        {/* Last Name */}
        <div className="last-name">
          <Label htmlFor='lastName'>{t('last-name')}</Label>
          <Input type='text' id='lastName' placeholder='Adrian' {...register('name.lastName')} />
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

      {/* Submit Button */}
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Creating ...' : 'Create Account'}
      </Button>
    </form>
  )
}