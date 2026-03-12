import React, { Suspense } from 'react';
import CartContainer from './_components/cart-container';

import CartSkeleton from '@/components/skeleton/cart-skeleton';

export default function CartPage() {
  return (
    <Suspense fallback={<CartSkeleton />}>
      <CartContainer />
    </Suspense>
  );
}
