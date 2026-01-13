import { Product } from '@/lib/types/product';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProductDetails from './product-details';
import Rating from '../rating/rating';

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="relative w-72 cursor-pointer space-y-3 rounded-md bg-white p-2 shadow-md dark:bg-black">
          <div className="relative h-64 w-full overflow-hidden rounded-md">
            <Image
              src={product.imgCover}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="line-clamp-1 text-start text-lg font-semibold text-maroon-700 dark:text-pink-200">
              {product.title}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Rating rating={product.rateAvg} />
              </div>
              <p className="flex items-center justify-center gap-3 text-lg font-semibold text-maroon-700 dark:text-pink-200">
                {product.priceAfterDiscount}EGP
                <del className="text-sm text-zinc-400 dark:text-zinc-500">
                  {product.price}EGP
                </del>
              </p>
            </div>
            <Button className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-maroon-600 text-maroon-50 dark:bg-maroon-500">
              <ShoppingCart className="size-6" />
            </Button>
          </div>
          <div className="absolute right-4 top-4 flex h-4 w-11 items-center justify-center rounded-lg bg-zinc-100">
            <span className="text-zinc-700">New</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Product Details Component 🤞
          </DialogTitle>
          <DialogDescription>
            <ProductDetails productInfo={product} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
