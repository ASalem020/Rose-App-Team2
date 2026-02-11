'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

/**
 * @description This component is used to log out the user from the application. It uses the signOut function from next-auth to log out the user and it redirects them to the login page.
 * @returns A React component that shows a button to log out the user from the application.
 */ 
export default function Logout() {
  // ^ translations
  const t = useTranslations('pages.profile');

  return (
    <Button
      onClick={() => signOut({callbackUrl: "/login"})}
      className="flex items-center gap-2 cursor-pointer bg-zinc-100 px-6 py-3 font-bold text-maroon-500 hover:bg-zinc-200/50 tracking-wide"
    >
      <LogOut />
      {t('sidebar.Logout')}
    </Button>
  );
}
