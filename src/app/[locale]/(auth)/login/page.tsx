import React from 'react';
import LoginForm from './_components/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return <div className='flex flex-col items-center justify-center h-screen w-1/3 space-y-11 '>
    {/* Header */}
    {/* Waiting for Hady */}
    <h1 className='text-maroon-700 text-3xl font-semibold text-center max-w-sm w-full'>Welcome back!</h1>

    {/* login form */}
    <LoginForm />

    {/* footer */}
    <footer>
      <p className='text-zinc-800 max-w-sm w-full'>Don’t have an account yet? <Link href={'/register'} className='text-maroon-700'>Create one now!</Link></p>
    </footer>

  </div>;
}
