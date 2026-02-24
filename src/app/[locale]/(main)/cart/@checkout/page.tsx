'use client';

import React from 'react';
import PriceSummary from '../checkout/_components/price-summary';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from '@/i18n/navigation';
import { MoveRight } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();

  const isCheckoutPage = pathname.includes('/checkout');

  return (
    <div className="h-2/4">
      <PriceSummary />
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
    </div>
  );
}
