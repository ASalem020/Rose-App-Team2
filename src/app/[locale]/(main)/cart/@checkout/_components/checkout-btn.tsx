'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function CheckoutBtn() {
  // Translation
  const t = useTranslations('pages.checkout');

  const router = useRouter();
  const pathname = usePathname();

  const isCheckoutPage = pathname.includes('/checkout');

  return (
    <>
      {!isCheckoutPage && (
        <Button
          className="mt-4 h-16 w-full text-xl font-medium"
          onClick={() => {
            router.push('/cart/checkout');
          }}
        >
          {t('checkout-btn')}
          <MoveRight size={24} className="rtl:rotate-180" />
        </Button>
      )}
    </>
  );
}
