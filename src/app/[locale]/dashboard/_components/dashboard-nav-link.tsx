'use client';
import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import React from 'react';

type DashboardNavLinkProps = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

export default function DashboardNavLink({
  href,
  title,
  icon,
}: DashboardNavLinkProps) {
  // Translation
  const locales = routing.locales.join('|'); // "en|ar"

  // Navigation
  const pathname = usePathname();

  // Variables
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^\\/(${locales})(\\/|$)`),
    '/',
  );

  return (
    <Button
      variant={
        pathnameWithoutLocale === href
          ? 'secondary'
          : 'ghost'
      }
      asChild
      className="justify-start p-2.5 hover:bg-maroon-50 hover:text-maroon-600"
    >
      <Link
        href={href}
        className="flex items-center gap-2.5"
      >
        {icon}
        <span className="text-lg font-bold">{title}</span>
      </Link>
    </Button>
  );
}
