import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function CartEmpty() {
  // translation
  const t = useTranslations('pages.cart');

  return (
    <div className="flex min-h-96 flex-col items-center justify-center">
      <Image
        src="/assets/images/cart/cart-empty.svg"
        alt="empty-cart"
        width={250}
        height={215}
      />
      <p className="text-lg text-zinc-400 dark:text-zinc-600">
        {t('empty')}
      </p>
    </div>
  );
}
