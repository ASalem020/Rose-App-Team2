import DecoratedText from '@/components/features/auth/decorated-text';
import React from 'react';
import RegisterForm from './_components/register-form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RegisterPage() {
  // Translations
  const t = useTranslations('pages.register');

  return <div className='register-content'>
    <DecoratedText text='register' className='mb-4' />
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Project Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="web">
          Web Application
        </SelectItem>
        <SelectItem value="mobile">
          Mobile App
        </SelectItem>
        <SelectItem value="branding">
          Branding
        </SelectItem>
      </SelectContent>
    </Select>
    <RegisterForm />
    <p className='text-center text-sm mt-5 rtl:font-tajawal font-medium text-zinc-800'>
      {t.rich('have-account', {
        Link: (chunks: string) => <Link href='/login' className='text-maroon-700 duration-300 hover:text-maroon-800'>{chunks}</Link>
      })}
    </p>
  </div>;
}
