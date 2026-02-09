import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function CartItem() {
  return (
    <div className="flex h-40 flex-row gap-4 border-b border-b-zinc-200 pb-5 dark:border-b-zinc-700">
      <Image
        src="/assets/images/about/about-img-2.png"
        alt="cart-item"
        width={117}
        height={140}
        className="rounded-lg"
      />
      <div className="flex w-4/5 flex-1 flex-col justify-between">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-lg font-semibold text-maroon-700 dark:text-maroon-400">
              Dreamy White Roses Bouquet
            </h3>
            <div className="flex flex-row items-center gap-1">
              <Star
                fill="orange"
                stroke="orange"
                strokeWidth={2}
                size={20}
              />
              Rating:
              <span className="font-medium">4/5</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                (5 ratings)
              </span>
            </div>
          </div>
          <Button className="w-24" variant={'destructive'}>
            <Trash2 /> Remove
          </Button>
        </div>
        <div className="flex flex-row items-end justify-between">
          <p>
            <span className="font-medium text-maroon-600 dark:text-maroon-400">
              (×1)
            </span>
            <span className="ms-1 text-2xl font-bold">
              199.50
            </span>
            <span className="ms-1 font-medium">EGP</span>
          </p>
          <div className="flex flex-row gap-2">
            <Button
              variant={'secondary'}
              className="size-12 px-4 py-2"
            >
              <Minus size={20} />
            </Button>
            <Input
              width={100}
              height={50}
              className="h-12 w-24"
            />
            <Button
              variant={'secondary'}
              className="size-12 px-4 py-2"
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
