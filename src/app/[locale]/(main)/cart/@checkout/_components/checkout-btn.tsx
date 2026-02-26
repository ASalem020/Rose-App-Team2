'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/navigation';
import { MoveRight } from 'lucide-react';
import React from 'react';

export default function CheckoutBtn() {
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
          Checkout
          <MoveRight size={24} className="rtl:rotate-180" />
        </Button>
      )}
    </>
  );
}
