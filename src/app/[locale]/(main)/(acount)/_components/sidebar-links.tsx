'use client';

import { usePathname, Link } from '@/i18n/navigation';
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
        className={`flex items-center gap-3 p-4 mb-2 rounded-md ${
          pathname === '/profile'
            ? 'bg-zinc-800 text-white '
            : 'hover:bg-gray-200/50'
        }`}
      >
        <CircleUser />
        {t('sidebar.My-Account')}
      </Link>

      {/* change-password */}
      <Link
        href={'/change-password'}
        className={`flex items-center gap-3 p-4 mb-2 ${
          pathname === '/change-password'
            ? 'bg-zinc-800 text-white'
            : 'hover:bg-gray-200/50'
        }`}
      >
        <Lock />
        {t('sidebar.Change-Password')}
      </Link>
    </div>
  );
}
