'use client';


// Imports


import { useTranslations } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import { CircleUser, Lock } from 'lucide-react';

import { cn } from '@/lib/utils/tailwind-merge';


// Types


type Props = {
  /** Base path prefix for the account links.
   *  - In the main site: "" (empty — links become /profile, /change-password)
   *  - In the dashboard: "/dashboard/account" (links become /dashboard/account/profile, etc.)
   */
  basePath?: string;
};


// Component


/**
 * AccountSidebarLinks - Navigation links for the account section
 *
 * Features:
 * - Highlights the active link based on the current pathname
 * - Accepts a basePath prop so the same component works in both
 *   the main site (/profile) and the dashboard (/dashboard/account/profile)
 * - Fully translated (EN / AR)
 *
 * @param basePath - Optional path prefix for generating the hrefs
 */
export default function AccountSidebarLinks({ basePath = '' }: Props) {

  // Translation


  const t = useTranslations('pages.profile');


  // Navigation


  const pathname = usePathname();


  // Variables


  const profilePath = basePath ? `${basePath}/profile` : '/profile';
  const changePasswordPath = basePath
    ? `${basePath}/change-password`
    : '/change-password';


  // Render


  return (
    <div className="flex flex-col justify-center space-y-3 px-6">

      {/* Profile link */}
      <Link
        href={profilePath}
        className={cn(
          'flex items-center gap-3 rounded-lg px-4 py-3 mb-2',
          pathname === profilePath
            ? 'bg-zinc-800 text-white'
            : 'hover:bg-gray-200/50',
        )}
      >
        <CircleUser />
        {t('sidebar.my-account')}
      </Link>

      {/* Change password link */}
      <Link
        href={changePasswordPath}
        className={cn(
          'flex items-center gap-3 mb-2 rounded-lg px-4 py-3',
          pathname === changePasswordPath
            ? 'bg-zinc-800 text-white'
            : 'hover:bg-gray-200/50',
        )}
      >
        <Lock />
        {t('sidebar.change-password')}
      </Link>
    </div>
  );
}
