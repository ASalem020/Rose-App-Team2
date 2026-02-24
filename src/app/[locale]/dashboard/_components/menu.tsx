'use client';
import { useState } from 'react';
import {
  EllipsisVertical,
  LogOut,
  User,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge';
import { signOut, useSession } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Menu() {
  const t = useTranslations();

  // State
  const [isOpen, setIsOpen] = useState(false);

  // Variables
  const session = useSession();

  // Functions
  const handleToggle = () => setIsOpen(prev => !prev);
  const handleLogout = () => signOut();

  return (
    <div className="menu relative">
      <div
        className="dropdown-trigger cursor-pointer"
        role="button"
        aria-label="dashboard sidebar dropdown menu trigger"
        onClick={handleToggle}
      >
        {isOpen ? (
          <X size={18} className="text-zinc-800" />
        ) : (
          <EllipsisVertical
            size={18}
            className="text-zinc-800/50 duration-300 hover:text-zinc-800"
          />
        )}
      </div>
      <ul
        className={cn(
          'dropdown-menu absolute bottom-full start-full z-50 min-w-56 rounded-lg border border-zinc-100 bg-white shadow-md duration-300',
          isOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0',
        )}
      >
        <li className="name p-3 text-sm font-semibold text-maroon-700">
          {`${session.data?.user.firstName} ${session.data?.user.lastName}`}
        </li>
        <li className="cursor-pointer border-y border-black/[8%] p-3 text-sm font-medium text-zinc-700 duration-300 hover:bg-zinc-100">
          <Link
            href={'/dashboard/account-settings'}
            className="flex items-center gap-2"
          >
            <User size={16} />
            <span>
              {t('pages.dashboard.menu.account-settings')}
            </span>
          </Link>
        </li>
        <li
          className="flex cursor-pointer items-center gap-2 p-3 text-sm font-medium text-zinc-700 duration-300 hover:bg-maroon-50 hover:text-maroon-600"
          role="button"
          aria-label="signout button"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>{t('pages.dashboard.menu.logout')}</span>
        </li>
      </ul>
    </div>
  );
}
