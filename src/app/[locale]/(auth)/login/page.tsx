'use client';

import React from 'react';
import LoginForm from './_components/login-form';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DecoratedText from '@/components/features/auth/decorated-text';

export default function LoginPage() {
  
    // ^ translation
    const t = useTranslations('pages.login');

    return <>
        <div className='flex flex-col space-y-11 justify-center items-center pb-9'>
            {/* Header */}
            {/* Waiting for Hady */}
            <DecoratedText text="login" />

            {/* login form */}
            <LoginForm />


        </div>
        {/* footer */}
        <footer>
            <p className='text-zinc-800 w-full text-center'>{t('footer')}<Link href={'/register'} className='text-maroon-700'>{t('register')}</Link></p>
        </footer>
    </>
  
}
