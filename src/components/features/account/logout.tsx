'use client';


// Imports


import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';


// Component


/**
 * Logout - Button that signs the user out and redirects to /login
 *
 * Uses next-auth signOut which clears the session cookie
 * and triggers a redirect to the login page.
 */
export default function Logout() {

  // Translation


  const t = useTranslations('pages.profile');


  // Render


  return (
    <Button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center justify-start gap-2 cursor-pointer bg-zinc-100 px-6 py-3 font-bold text-maroon-500 hover:bg-zinc-200/50 tracking-wide"
    >
      <LogOut className="rotate-180" />
      {t('sidebar.logout')}
    </Button>
  );
}
