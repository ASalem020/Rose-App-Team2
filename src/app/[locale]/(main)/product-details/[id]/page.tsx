// 'use client'

import { Button } from '@/components/ui/button';
import {
  HeartPlus,
  Package,
  ShoppingCart,
  Star,
} from 'lucide-react';
import useProductDetails from './_hooks/use-product-details';
import ProductGallery from './_components/product-gallery';
import { getProductDetails } from '@/lib/services/product-details.service';

type PageProps = {
  params: { id: string };
};


export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { id } = params;


  // const { product } = useProductDetails(id)
  const product = await getProductDetails(id)




  return (
    <div className="container m-auto mb-12 mt-16 flex h-128 flex-row gap-16">

      <ProductGallery product={product} />

      <div>
        <div className="border-b-2 border-b-zinc-100 pb-4 text-3xl font-semibold text-zinc-800 dark:border-b-zinc-700 dark:text-zinc-50">
          <h1>{product?.title}</h1>
          <div className="mt-2 flex flex-row gap-3">
            <p>
              <span className="text-zinc-300 line-through dark:text-zinc-500">
                {product?.price}
              </span>{' '}
              {product?.priceAfterDiscount}
            </p>
            <p className="flex items-center justify-center gap-1 rounded-2xl bg-zinc-100 px-3 py-1 text-sm">
              <Package size={20} />
              {product?.quantity - product?.sold} left in stock
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-3 border-b-2 border-b-zinc-100 pb-4 dark:border-b-zinc-700">
          <Star
            fill="orange"
            stroke="orange"
            strokeWidth={2}
            size={20}
          />
          Rating: <span className="font-medium">{product?.rateAvg}/5</span>
          <span className="font-medium text-blue-600 dark:text-blue-400">
            ({product?.rateCount} ratings)
          </span>
        </div>

        <p className="mt-4 h-72 overflow-auto text-zinc-600 dark:text-zinc-400">
          {product?.description}
        </p>

        <div className="mt-4 flex gap-2">
          <Button
            variant={'subtle'}
            className="w-fit border-none bg-zinc-100 px-4 py-2"
          >
            <HeartPlus color="black" size={25} />
          </Button>
          <Button className="flex-1 font-medium">
            <ShoppingCart /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
