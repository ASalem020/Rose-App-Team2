'use client';

import { Button } from '@/components/ui/button';
import {
  HeartPlus,
  Package,
  ShoppingCart,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

type PageProps = {
  params: { id: string };
};

const productImages = [
  '/assets/images/Image.png',
  '/assets/images/66fc9304-3ceb-4b73-97dd-730ccf790c49-image_three.png',
  '/assets/images/8ee8e389-da6a-4371-8b13-5e35fcca16c6-image_one.png',
];

export default function ProductDetailsPage({
  params,
}: PageProps) {
  const { id } = params;
  const [activeImage, setActiveImage] = useState(
    productImages[0],
  );

  return (
    <div className="container m-auto mb-12 mt-16 flex h-128 flex-row gap-16">
      <div className="flex flex-col gap-4">
        <div className="flex h-[400px] w-[600px] items-center justify-center overflow-hidden rounded-lg bg-zinc-50 dark:bg-zinc-900">
          <Image
            src={activeImage}
            alt="Product Details"
            width={600}
            height={400}
            className="h-full w-full object-contain transition-all duration-300"
          />
        </div>
        <div className="flex flex-row gap-4">
          {productImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Product Thumbnail ${index + 1}`}
              width={90}
              height={110}
              onClick={() => setActiveImage(img)}
              className={`h-[110px] w-[90px] cursor-pointer rounded-md border-2 object-cover transition-all ${
                activeImage === img
                  ? 'border-maroon-600'
                  : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <div className="border-b-2 border-b-zinc-100 pb-4 text-3xl font-semibold text-zinc-800 dark:border-b-zinc-700 dark:text-zinc-50">
          <h1>Dreamy White Roses Bouquet</h1>
          <div className="mt-2 flex flex-row gap-3">
            <p>
              <span className="text-zinc-300 line-through dark:text-zinc-500">
                320
              </span>{' '}
              199.50 EGP
            </p>
            <p className="flex items-center justify-center gap-1 rounded-2xl bg-zinc-100 px-3 py-1 text-sm">
              <Package size={20} />
              265 left in stock
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
          Rating: <span className="font-medium">4.5/5</span>
          <span className="font-medium text-blue-600 dark:text-blue-400">
            (8 ratings)
          </span>
        </div>

        <p className="mt-4 h-72 overflow-auto text-zinc-600 dark:text-zinc-400">
          Elevate any celebration with our luxury rose
          bouquet. This exquisite arrangement features
          pristine white roses wrapped in a sophisticated
          dark teal wrap, creating a stunning visual
          contrast. Perfect for celebrations, anniversaries,
          or as a heartfelt gift, this bouquet combines
          timeless elegance with modern style. Make a
          memorable impression with this luxurious floral
          arrangement. Buy now to delight your loved ones
          with the beauty and grace of these premium roses.
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
