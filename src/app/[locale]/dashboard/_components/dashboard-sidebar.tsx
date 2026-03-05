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
import UserSummary from './user-summary';

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
      <div className="main-content relative flex grow flex-col gap-6">
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
        {/* Make it sticky to make it easy to follow when scroll in page ( best UX ) */}
        <nav className="navigation-links sticky top-6 flex flex-col gap-4">
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
        <UserSummary />

        {/* Menu */}
        <Menu />
      </div>
    </aside>
  );
}
