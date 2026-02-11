import React from 'react';
import CartItem from './cart-item';
import ClearCartBtn from './clear-cart-btn';
import { getCartService } from '@/lib/services/cart-service';
import { CartResponse } from '@/lib/types/cart';
import CartEmpty from './cart-empty';
import ContinueShoppingBtn from './continue-shopping-btn';
import { getTranslations } from 'next-intl/server';

export default async function CartContainer() {
  // translation
  const t = await getTranslations('pages.cart');

  // Fetch product details
  const payload: CartResponse = await getCartService();

  return (
    <div className="container">
      {/* Cart Heading */}
      <div className="flex flex-row justify-between">
        <h2 className="text-5xl font-bold text-zinc-800 dark:text-zinc-50">
          {t('title')}
          <span className="ms-2 text-base font-medium text-zinc-400">
            {payload.cart.cartItems.length}
            {t('products')}
          </span>
        </h2>

        {/* Clear cart button */}
        <ClearCartBtn />
      </div>

      {/* Cart items */}
      <div className="mt-6 flex max-h-screen flex-col gap-4 overflow-auto rounded-xl border-2 border-zinc-200 p-5">
        {payload.cart.cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          payload.cart.cartItems.map(item => (
            <CartItem key={item._id} item={item} />
          ))
        )}
      </div>

      {/* Continue shopping button */}
      <ContinueShoppingBtn />
    </div>
  );
}
