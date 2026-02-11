'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addToCartAction } from '@/lib/actions/add-to-cart-action';
import { removeCartItemAction } from '@/lib/actions/remove-cart-item-action';
import { updateCartQuantityAction } from '@/lib/actions/update-cart-quantity';
import { CartItem as TCartItem } from '@/lib/types/cart';
import { Minus, Plus, Star, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

// Cart item props
type CartItemProps = {
  item: TCartItem;
};

export default function CartItem({ item }: CartItemProps) {
  // Translation
  const t = useTranslations('pages.cart.cart-item');

  // States
  const [quantity, setQuantity] = useState(item.quantity);
  const { status } = useSession();

  // variables
  const isLoggedIn = status === 'authenticated';

  // Handlers
  // Increase button handler
  const increaseBtnHandler = async () => {
    // Increase the quantity
    const newQuantity = quantity + 1;

    // Set the new quantity
    setQuantity(newQuantity);

    // store in localStorage
    if (!isLoggedIn) {
      const storedCart = localStorage.getItem('cart');

      const cartData = JSON.parse(storedCart || '[]');

      const existingProductIndex =
        cartData.cart.cartItems.findIndex(
          (cartItem: TCartItem) =>
            cartItem.product._id === item.product._id,
        );

      // Product already exists → increase quantity only
      if (existingProductIndex !== -1) {
        cartData.cart.cartItems[
          existingProductIndex
        ].quantity += 1;
      }

      // save cart to local storage
      localStorage.setItem(
        'cart',
        JSON.stringify(cartData),
      );
      return;
    }

    // Add the item to the cart
    await addToCartAction({
      product: item.product,
      quantity: 1,
    });
  };

  // Decrease button handler
  const decreaseBtnHandler = async () => {
    // Decrease the quantity
    const newQuantity = quantity - 1;

    // If the quantity is 0, do nothing
    if (newQuantity === 0) {
      return;
    }

    // Set the new quantity
    setQuantity(newQuantity);

    // store in localStorage
    if (!isLoggedIn) {
      const storedCart = localStorage.getItem('cart');

      const cartData = JSON.parse(storedCart || '[]');

      const existingProductIndex =
        cartData.cart.cartItems.findIndex(
          (cartItem: TCartItem) =>
            cartItem.product._id === item.product._id,
        );

      // Product already exists → decrease quantity only
      if (existingProductIndex !== -1) {
        cartData.cart.cartItems[
          existingProductIndex
        ].quantity -= 1;
      }

      // save cart to local storage
      localStorage.setItem(
        'cart',
        JSON.stringify(cartData),
      );
      return;
    }

    // Update the cart quantity
    await updateCartQuantityAction({
      productId: item.product._id,
      quantity: newQuantity,
    });
  };

  // Remove button handler
  const removeBtnHandler = async () => {
    // remove from localStorage if guest
    if (!isLoggedIn) {
      const storedCart = localStorage.getItem('cart');
      const cartData = JSON.parse(storedCart || '[]');

      const existingProductIndex =
        cartData?.cart?.cartItems.findIndex(
          (cartItem: TCartItem) =>
            cartItem.product._id === item.product._id,
        );

      // Product already exists → remove it
      if (existingProductIndex !== -1) {
        cartData.cart.cartItems.splice(
          existingProductIndex,
          1,
        );
      }

      // save cart to local storage
      localStorage.setItem(
        'cart',
        JSON.stringify(cartData),
      );

      // reload page to update the cart
      window.location.reload();

      return;
    }

    // if user
    // Remove the item from the cart
    await removeCartItemAction({
      productId: item.product._id,
    });

    // Refresh the page to remove the item from the cart
    window.location.reload();
  };

  // Input handler
  const inputHandler = async () => {
    // Update the cart quantity with input value
    await updateCartQuantityAction({
      productId: item.product._id,
      quantity,
    });
  };

  return (
    <div className="flex h-40 flex-row gap-4 border-b border-b-zinc-200 pb-5 last:border-none dark:border-b-zinc-700">
      {/* Item image */}
      <Image
        src={item.product.imgCover}
        alt="cart-item"
        width={117}
        height={140}
        className="rounded-lg"
      />

      {/* Item info */}
      <div className="flex w-4/5 flex-1 flex-col justify-between">
        <div className="flex flex-row justify-between">
          <div>
            {/* Item title */}
            <h3 className="text-lg font-semibold text-maroon-700 dark:text-maroon-400">
              {item.product.title}
            </h3>
            {/* Item rating */}
            <div className="flex flex-row items-center gap-1">
              <Star
                fill="orange"
                stroke="orange"
                strokeWidth={2}
                size={20}
              />
              {t('rating')}
              <span className="font-medium">
                {item.product.rateAvg}/5
              </span>
              {/* Item rating count */}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                ({item.product.rateCount} {t('ratingCount')}
                )
              </span>
            </div>
          </div>

          {/* Remove button */}
          <Button
            className="w-24"
            variant={'destructive'}
            onClick={() => removeBtnHandler()}
          >
            <Trash2 /> {t('remove')}
          </Button>
        </div>

        {/* Item price */}
        <div className="flex flex-row items-end justify-between">
          <p>
            <span className="font-medium text-maroon-600 dark:text-maroon-400">
              (×{quantity})
            </span>
            <span className="ms-1 text-2xl font-bold">
              {item.product.price * quantity}
            </span>
            <span className="ms-1 font-medium">
              {t('currency')}
            </span>
          </p>

          {/* Quantity buttons */}
          <div className="flex flex-row gap-2">
            {/* Decrease button */}
            <Button
              variant={'secondary'}
              className="size-12 px-4 py-2"
              onClick={() => decreaseBtnHandler()}
            >
              <Minus size={20} />
            </Button>

            {/* Quantity input */}
            <Input
              width={100}
              height={50}
              className="h-12 w-24"
              placeholder={item.quantity.toString()}
              value={quantity}
              onChange={e => {
                setQuantity(Number(e.target.value));
              }}
              onBlur={() => inputHandler()}
            />

            {/* Increase button */}
            <Button
              variant={'secondary'}
              className="size-12 px-4 py-2"
              onClick={() => increaseBtnHandler()}
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
