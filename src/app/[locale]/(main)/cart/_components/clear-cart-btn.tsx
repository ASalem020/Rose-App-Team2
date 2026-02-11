'use client';

import { Button } from '@/components/ui/button';
import { clearUserCartAction } from '@/lib/actions/clear-user-cart-action';
import { BrushCleaning } from 'lucide-react';
import React from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function ClearCartBtn() {
  // translation
  const t = useTranslations('pages.cart');

  // Hooks
  const router = useRouter();

  // Handlers
  const clearCartHandler = async () => {
    // Clear the user cart
    await clearUserCartAction();

    // Refresh the page
    router.refresh();
  };
  return (
    // Clear cart button
    <Button
      variant={'secondary'}
      className="text-sm font-semibold text-maroon-600 dark:text-maroon-400"
      onClick={() => clearCartHandler()}
    >
      <BrushCleaning size={20} />
      {t('clear-cart')}
    </Button>
  );
}
