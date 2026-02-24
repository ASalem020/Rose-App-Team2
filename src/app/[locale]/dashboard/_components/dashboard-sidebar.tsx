import { cn } from '@/lib/utils/tailwind-merge';
import { dashboardLinks } from '../_constants/dashboard-links';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  CalendarHeart,
  ClipboardList,
  Flower,
  LayoutDashboard,
  Package,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import DashboardNavLink from './dashboard-nav-link';
import Menu from './menu';

export default function DashboardSidebar({
  className,
}: {
  className?: string;
}) {
  // Translation
  const t = useTranslations('pages.dashboard.nav-links');

  // Variables
  const icons: { [key: string]: React.ReactNode } = {
    'layout-dashboard': <LayoutDashboard size={25} />,
    'clipboard-list': <ClipboardList size={25} />,
    'calender-heart': <CalendarHeart size={25} />,
    package: <Package size={25} />,
  };

  return (
    <aside
      className={cn(
        className,
        'relative flex flex-col justify-between border-e border-black/[8%] bg-white p-6',
      )}
    >
      {/* Main Content */}
      <div className="main-content flex flex-col gap-6">
        {/* Logo */}
        <div className="logo-container flex">
          <div className="logo relative mx-auto h-28 w-32">
            <Image
              src="/assets/images/logo/logo.png"
              alt="rose app logo"
              fill
            />
          </div>
        </div>

        {/* Preview Website Button */}
        <div className="preview-website-button">
          <Button className="w-full gap-2 p-2.5" asChild>
            <Link href={'/'}>
              <Flower size={25} />
              <span className="font-semibold">
                {t('preview-website')}
              </span>
            </Link>
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="navigation-links flex flex-col gap-4">
          {dashboardLinks.map(link => (
            <DashboardNavLink
              href={link.href}
              title={t(link['translation-key'])}
              icon={icons[link.icon]}
              key={link.href}
            />
          ))}
        </nav>
      </div>

      {/* User Info */}
      <div className="user-info sticky bottom-6 flex items-center justify-between border-t border-black/[8%] pt-4">
        {/* User Summary */}
        <div className="user-summary flex items-center gap-2.5">
          <div className="user-image relative size-14 rounded-full">
            <Image
              src={'/images/default.jpg'}
              alt="username profile image"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="info">
            {/* User Name */}
            <p className="user-name text-sm font-bold text-zinc-800">
              Firstname Lastname
            </p>

            {/* User Email */}
            <p className="user-email text-xs text-zinc-800/50">
              user-email@example.com
            </p>
          </div>
        </div>

        {/* Menu */}
        <Menu />
      </div>
    </aside>
  );
}
