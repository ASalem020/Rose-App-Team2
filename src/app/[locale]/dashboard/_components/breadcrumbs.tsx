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
import { useQuery } from '@tanstack/react-query';
import { getOccasionAction } from '@/lib/actions/get-occasion.action';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** MongoDB ObjectId: exactly 24 hex characters */
const isObjectId = (s: string) => /^[0-9a-f]{24}$/i.test(s);

/**
 * If the segment is an ObjectId, fetch the occasion name and show that.
 * Otherwise just render the segment as-is (capitalised).
 */
function SmartSegment({ segment }: { segment: string }) {
  const looksLikeId = isObjectId(segment);

  const { data } = useQuery({
    queryKey: ['occasion', segment],
    queryFn: async () => {
      const payload = await getOccasionAction(segment);
      if ('error' in payload) throw new Error(payload.error);
      return payload;
    },
    enabled: looksLikeId,
    staleTime: 60_000,
  });

  if (looksLikeId) {
    // Show name once loaded, or a short fallback while loading
    return <>{data?.name ?? '…'}</>;
  }

  return <span className="capitalize">{segment}</span>;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Breadcrumbs() {
  const locales = routing.locales.join('|'); // "en|ar"
  const pathname = usePathname();

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
      <BreadcrumbList>
        {paths.map((path, i) => {
          // Reconstruct the raw path segment (before the .replace(/-/, ' '))
          const rawSegment = pathnameWithoutLocale
            .split('/')
            .filter(p => p !== '')[i];

          return (
            <>
              {i === paths.length - 1 ? (
                <BreadcrumbPage key={path} className="capitalize">
                  <SmartSegment segment={rawSegment} />
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem key={path}>
                  <Link
                    href={`/${paths.slice(0, i + 1).join('/')}`}
                    className="capitalize"
                  >
                    <SmartSegment segment={rawSegment} />
                  </Link>
                </BreadcrumbItem>
              )}
              {i !== paths.length - 1 && <BreadcrumbSeparator />}
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
