import React from 'react';
import CartItem from './cart-item';
import { Button } from '@/components/ui/button';
import { BrushCleaning } from 'lucide-react';

export default function CartContainer() {
  return (
    <div className="mx-20 my-12 flex flex-row gap-10">
      <div className="w-3/5">
        <div className="flex flex-row justify-between">
          <h2 className="text-5xl font-bold text-zinc-800 dark:text-zinc-50">
            Cart
            <span className="ms-2 text-base font-medium text-zinc-400">
              6 products
            </span>
          </h2>
          <Button
            variant={'secondary'}
            className="text-sm font-semibold text-maroon-600 dark:text-maroon-400"
          >
            <BrushCleaning size={20} />
            Clear Cart
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-xl border-2 border-zinc-200 p-5">
          <CartItem />
          <CartItem />
        </div>
      </div>
      <div className="flex-1">
        Summary Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Assumenda, modi sit. Ratione in
        eligendi voluptas placeat unde pariatur, et rem
        dolorem illo neque. Expedita fugit, deleniti
        aspernatur doloremque amet illum laborum eum culpa
        veniam iusto doloribus possimus sit ad reiciendis.
      </div>
    </div>
  );
}
