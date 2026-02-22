'use client'

import {usePathname , Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/tailwind-merge';
import { CircleUser, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SideBarLinks() {
  // ^ translations
  const t = useTranslations('pages.profile');

  // ^ hooks
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-center space-y-3 px-6 ">
      {/* profile */}
      <Link
        href={'/profile'}
        className={cn(`flex items-center gap-3 rounded-lg px-4 py-3 mb-2` ,
          pathname === '/profile'
            ? 'bg-zinc-800 text-white '
            : 'hover:bg-gray-200/50'
        )}
      >
        <CircleUser />
        {t('sidebar.my-account')}
      </Link>

      {/* change-password */}
      <Link
        href={'/change-password'}
        className={cn(`flex items-center gap-3 mb-2 rounded-lg px-4 py-3` ,
          pathname === '/change-password'
            ? 'bg-zinc-800 text-white'
            : 'hover:bg-gray-200/50'
        )}
      >
        <Lock />
        {t('sidebar.change-password')}
      </Link>
    </div>
  );
}
