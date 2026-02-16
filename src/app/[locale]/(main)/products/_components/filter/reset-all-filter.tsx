'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function ResetAllFilters() {
  // ^ Translation
  const t = useTranslations('pages.product.filter');

  // ^ Navigation
  const router = useRouter();
  const pathname = usePathname();

  return (
    // ^ 2 Reset All Button
    <Button
      onClick={() => router.push(pathname)}
      className="flex h-11 w-full items-center justify-center gap-3 rounded-md bg-maroon-100/50 text-lg text-maroon-600 hover:bg-maroon-100"
    >
      <RotateCcw />
      {t('resetAll')}
    </Button>
  );
}
