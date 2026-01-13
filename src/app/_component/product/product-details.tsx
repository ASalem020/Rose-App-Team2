import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import Image from 'next/image';

export default function ProductDetails({
  productInfo,
}: {
  productInfo: Product;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-5 p-4">
      <div className="relative h-56 w-full overflow-hidden rounded-md">
        <Image
          src={productInfo.imgCover}
          alt={productInfo.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-3">
        <h3 className="line-clamp-1 text-lg font-bold text-maroon-700">
          {productInfo.title}
        </h3>
        <p className="line-clamp-2 text-zinc-700">
          {productInfo.description}
        </p>
        <p className="flex items-center gap-3 text-lg font-semibold text-maroon-700">
          {productInfo.priceAfterDiscount}EGP
          <del className="text-sm text-zinc-400">
            {productInfo.price}EGP
          </del>
        </p>
        <p className="font-semibold text-zinc-700">
          Quantity : {productInfo.quantity}
        </p>
        <Button className="flex cursor-pointer items-center justify-center rounded-md bg-maroon-600 text-white">
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
