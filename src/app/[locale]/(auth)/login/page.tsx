"use client";

import React from 'react';
import LoginForm from './_components/login-form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';


export default function LoginPage() {

  // ^ translation
  const t = useTranslations('pages.login');


  return <div className='flex flex-col items-center justify-center h-screen w-1/3 space-y-11 '>
    {/* Header */}
    {/* Waiting for Hady */}
    <h1 className='text-maroon-700 text-3xl font-semibold text-center max-w-sm w-full'>{t('header')}</h1>

    {/* login form */}
    <LoginForm />

    {/* footer */}
    <footer>
      <p className='text-zinc-800 max-w-sm w-full'>{t('footer')}<Link href={'/register'} className='text-maroon-700'>{t('register')}</Link></p>
    </footer>

  </div>;
}
