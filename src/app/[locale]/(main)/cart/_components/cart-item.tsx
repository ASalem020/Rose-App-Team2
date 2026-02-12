'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem as TCartItem } from '@/lib/types/cart';
import { Minus, Plus, Star, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  decreaseBtnHandler,
  increaseBtnHandler,
  inputHandler,
  removeBtnHandler,
} from '../_utils/cart-item-utils';

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
  const onIncrease = () =>
    increaseBtnHandler(
      quantity,
      setQuantity,
      isLoggedIn,
      item,
    );

  // Decrease button handler
  const onDecrease = () =>
    decreaseBtnHandler(
      quantity,
      setQuantity,
      isLoggedIn,
      item,
    );
    
  // Remove button handler
  const onRemove = () => removeBtnHandler(isLoggedIn, item);

  // Input handler
  const onInputBlur = () =>
    inputHandler(item, quantity, setQuantity, isLoggedIn);

  // on input change handler
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value;
    // If input is cleared or set to 0, force it to 1
    if (val === '' || parseInt(val) < 1) {
      setQuantity(1);
    } else if (/^\d+$/.test(val)) {
      setQuantity(parseInt(val));
    }
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
            onClick={onRemove}
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
              onClick={onDecrease}
            >
              <Minus size={20} />
            </Button>

            {/* Quantity input */}
            <Input
              inputMode="numeric"
              min="1"
              width={100}
              height={50}
              className="h-12 w-24"
              placeholder={item.quantity.toString()}
              value={quantity}
              onChange={onChangeHandler}
              onBlur={onInputBlur}
            />

            {/* Increase button */}
            <Button
              variant={'secondary'}
              className="size-12 px-4 py-2"
              onClick={onIncrease}
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
