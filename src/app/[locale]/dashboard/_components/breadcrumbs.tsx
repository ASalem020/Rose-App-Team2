'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function Breadcrumbs() {
  // Translation
  const locales = routing.locales.join('|'); // "en|ar"

  // Navigation
  const pathname = usePathname();

  // Variables
  const pathnameWithoutLocale = pathname.replace(
    new RegExp(`^\\/(${locales})(\\/|$)`),
    '/',
  );
  const paths = pathnameWithoutLocale
    .split('/')
    .filter(path => path !== '')
    .map(path => path.replace(/-/, ' '));

  return (
    <Breadcrumb className="flex min-h-16 flex-col justify-center border-b border-black/[8%] bg-white px-4">
      {/* Breadcrumb List */}
      <BreadcrumbList>
        {paths.map((path, i) => {
          return (
            <>
              {i === paths.length - 1 ? (
                <BreadcrumbPage
                  key={path}
                  className="capitalize"
                >
                  {path}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem key={path}>
                  <Link
                    href={`/${paths.slice(0, i + 1).join('/')}`}
                    className="capitalize"
                  >
                    {path}
                  </Link>
                </BreadcrumbItem>
              )}
              {i !== paths.length - 1 && (
                <BreadcrumbSeparator />
              )}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
