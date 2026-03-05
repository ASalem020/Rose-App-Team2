'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { MoveLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContinueShoppingBtn() {
  // Translation
  const t = useTranslations('pages.cart');

  // Navigation
  const router = useRouter();

  return (
    // Continue shopping button
    <Button
      className="mt-6 h-10 w-52"
      onClick={() => router.push('/products')}
    >
      <MoveLeft size={20} className="rtl:rotate-180" />
      {t('continue-shopping')}
    </Button>
  );
}
