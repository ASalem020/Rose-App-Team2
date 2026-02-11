'use client';

import React, { useEffect, useState } from 'react';
import CartItem from './cart-item';
import ClearCartBtn from './clear-cart-btn';
import { CartResponse } from '@/lib/types/cart';
import CartEmpty from './cart-empty';
import ContinueShoppingBtn from './continue-shopping-btn';
import { useTranslations } from 'next-intl';
import { useGetCart } from '../_hooks/use-get-cart';
import { useSession } from 'next-auth/react';
import { CartItem as TCartItem } from '@/lib/types/cart';
import CartSkeleton from '@/components/skeleton/cart-skeleton';
import useAddCart from '../../products/[id]/_hooks/use-add-cart';

export default function CartContainer() {
  // translation
  const t = useTranslations('pages.cart');

  // states
  const [guestCart, setGuestCart] =
    useState<CartResponse>();
  const [isHydrated, setIsHydrated] = useState(false);
  const { status } = useSession();

  // Mutation
  const { addToCart } = useAddCart();

  // variables
  const isLoggedIn = status === 'authenticated';

  // query
  const { data: payload, isPending } = useGetCart({
    enabled: isLoggedIn,
  });

  // Handle initial hydration and guest cart loading
  useEffect(() => {
    setIsHydrated(true);
    if (!isLoggedIn) {
      const stored = localStorage.getItem('cart');
      if (stored) {
        setGuestCart(JSON.parse(stored));
      } else {
        setGuestCart({ cart: { cartItems: [] } });
      }
    }
  }, [isLoggedIn]);

  // Handle guest cart synchronization to server on login
  useEffect(() => {
    // if user is logged in and cart is hydrated
    if (isLoggedIn && isHydrated) {
      // get cart from local storage
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          // parse cart from local storage
          const localData = JSON.parse(stored);
          const items = localData?.cart?.cartItems || [];
          // if cart is not empty
          if (items.length > 0) {
            // add all cart items to the database
            items.forEach((item: TCartItem) => {
              addToCart({
                product: item.product,
                quantity: item.quantity,
              });
            });
          }
          // remove cart from local storage
          localStorage.removeItem('cart');
          // set guest cart to empty
          setGuestCart({ cart: { cartItems: [] } });
        } catch (e) {
          console.error('Sync failed', e);
        }
      }
    }
  }, [isLoggedIn, isHydrated, addToCart]);

  // variables
  const cartData = isLoggedIn ? payload : guestCart;
  const cartItems = cartData?.cart?.cartItems || [];
  const isSessionLoading = status === 'loading';
  const isLoading =
    !isHydrated ||
    isSessionLoading ||
    (isLoggedIn && isPending) ||
    (!isLoggedIn && !guestCart);

  // fetching data
  if (isLoading) {
    return (
      <div className="container mt-10">
        <CartSkeleton />
      </div>
    );
  }
  return (
    <div className="container">
      {/* Cart Heading */}
      <div className="flex flex-row justify-between">
        <h2 className="text-5xl font-bold text-zinc-800 dark:text-zinc-50">
          {t('title')}
          <span className="ms-2 text-base font-medium text-zinc-400">
            {cartItems.length} {t('products')}
          </span>
        </h2>
        <ClearCartBtn />
      </div>

      {/* Cart items */}
      <div className="mt-6 flex max-h-screen flex-col gap-4 overflow-auto rounded-xl border-2 border-zinc-200 p-5">
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          cartItems.map((item: TCartItem) => (
            <CartItem key={item.product._id} item={item} />
          ))
        )}
      </div>

      {/* Continue Shopping Button */}
      <ContinueShoppingBtn />
    </div>
  );
}
