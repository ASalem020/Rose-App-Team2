'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import {
  HeartMinus,
  HeartPlus,
  Package,
  ShoppingCart,
  Star,
} from 'lucide-react';
import useAddCart from '../_hooks/use-add-cart';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/tailwind-merge';

type ProductContentProps = {
  product: Product;
};

export default function ProductContent({
  product,
}: ProductContentProps) {
  // States
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';

  // Mutation
  const { addToCart } = useAddCart();

  // Handlers
  const addToCartHandler = () => {
    if (!isLoggedIn) {
      const cart = JSON.parse(
        localStorage.getItem('cart') || '[]',
      );

      localStorage.setItem(
        'cart',
        JSON.stringify([...cart, product._id]),
      );
      toast.success('Product added to Cart Successfully');
      return;
    }
    addToCart(product._id, {
      onSuccess: () => {
        toast.success('Product added to Cart Successfully');
      },
    });
  };

  useEffect(() => {
    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]',
    );

    if (cart.length === 0) {
      return;
    }
    if (isLoggedIn) {
      cart.map((id: string) => {
        addToCart(id);
      });
      localStorage.removeItem('cart');
    }
  }, [isLoggedIn, addToCart]);

  return (
    <div className="flex w-1/2 flex-col">
      {/* Header */}
      <div className="border-b-2 border-b-zinc-100 pb-4 text-3xl font-semibold text-zinc-800 dark:border-b-zinc-700 dark:text-zinc-50">
        {/* Product Title */}
        <h1>{product.title}</h1>

        {/* Price Details */}
        <div className="mt-2 flex flex-row gap-3">
          <p>
            {/* Price */}
            <span className="me-2 text-zinc-300 line-through dark:text-zinc-500">
              {product.price}
            </span>
            {/* Price after discount */}
            {product.priceAfterDiscount}
            <span className="ms-1 text-xl font-medium">
              EGP
            </span>
          </p>

          {/* Quantity left in stock */}
          {product.quantity < 0 ? (
            <p className="flex items-center justify-center gap-1 rounded-2xl bg-red-50 px-3 py-1 text-sm text-red-600">
              <Package size={20} />
              Out of stock
            </p>
          ) : (
            <p className="flex items-center justify-center gap-1 rounded-2xl bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-700">
              <Package
                size={20}
                className="text-zinc-500"
              />
              {product.quantity - product.sold} left in
              stock
            </p>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="mt-4 flex flex-row items-center gap-3 border-b-2 border-b-zinc-100 pb-4 dark:border-b-zinc-700">
        <Star
          fill="orange"
          stroke="orange"
          strokeWidth={2}
          size={20}
        />
        Rating:
        <span className="font-medium">
          {product.rateAvg}/5
        </span>
        <span className="font-medium text-blue-600 dark:text-blue-400">
          ({product.rateCount} ratings)
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 h-72 overflow-auto leading-none text-zinc-600 dark:text-zinc-400">
        {product.description}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        {/* Add to wishlist Button */}
        <Button
          onClick={() => setIsWishlisted(prev => !prev)}
          variant={'subtle'}
          className={cn(
            `dark:border-1 w-12 border-none px-4 py-2 dark:border-solid dark:border-zinc-500`,
            isWishlisted
              ? 'bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:text-maroon-200 dark:hover:bg-zinc-800'
              : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800',
          )}
        >
          {isWishlisted ? (
            <HeartMinus size={25} />
          ) : (
            <HeartPlus size={25} />
          )}
        </Button>

        {/* Add to cart Button */}
        <Button
          className="flex-1 font-medium"
          onClick={addToCartHandler}
          disabled={product.quantity < 0}
        >
          <ShoppingCart size={25} /> Add to Cart
        </Button>
      </div>
    </div>
  );
}
