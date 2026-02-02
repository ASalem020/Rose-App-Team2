import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Rating from '../rating/rating';
import { Product } from '@/lib/types/product';

export default function ProductCard({
  productInfo,
}: {
  productInfo: Product;
}) {
  return (

    <div className="relative w-72 cursor-pointer space-y-3 rounded-xl">
      <div className="relative h-64 w-full overflow-hidden rounded-xl">
        <Image
          src={productInfo.imgCover}
          alt={productInfo.title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="line-clamp-1 text-start text-lg font-semibold text-maroon-700 dark:text-pink-200">
          {productInfo.title}
        </h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Rating rating={productInfo.rateAvg} />
          </div>
          <p className="flex items-center justify-center gap-3 text-lg font-semibold text-maroon-700 dark:text-pink-200">
            {productInfo.priceAfterDiscount}EGP
            <del className="text-sm text-zinc-400 dark:text-zinc-500">
              {productInfo.price}EGP
            </del>
          </p>
        </div>
        <Button className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-maroon-600 p-2 text-maroon-50 dark:bg-maroon-500">
          <ShoppingCart className="size-7" />
        </Button>
      </div>
      <div className="absolute right-4 top-4 flex h-4 w-11 items-center justify-center rounded-lg bg-zinc-100">
        <span className="text-zinc-700">New</span>
      </div>
    </div>

  );
}
