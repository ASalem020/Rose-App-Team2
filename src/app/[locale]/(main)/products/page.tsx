'use client';

// Imports

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import Rating from '@/components/shared/rating';
import SectionHeader from '@/components/shared/section-header';
import ReviewsList from './_components/reviews-list';
import AddReviewForm from './_components/add-review-form';
import RelatedProductsCarousel from './_components/related-products-carousel';
import { cn } from '@/lib/utils/tailwind-merge';
import { useTranslations } from 'next-intl';

// Types

// Component

/**
 * ProductPage - Main page for displaying product details, reviews, and related products
 *
 * Features:
 * - Displays product images with thumbnail selection
 * - Shows product information (price, rating, category, etc.)
 * - Lists product reviews
 * - Allows authenticated users to add reviews
 * - Shows related products carousel
 */

// Mock data - replace with actual API calls
const mockProduct: Product = {
  _id: '1',
  title: 'Dreamy White Roses Bouquet',
  description:
    'Elevate any celebration with our luxury rose bouquet. This exquisite arrangement features white roses wrapped in a sophisticated dark blue wrap, creating a stunning contrast that exudes elegance. Each rose is carefully selected for its pristine beauty and long-lasting freshness. Perfect for weddings, anniversaries, or any special occasion. The sophisticated presentation makes this bouquet ideal for those who appreciate the finer things. Buy now to delight your loved ones with the beauty and grace of these premium roses.',
  slug: 'dreamy-white-roses-bouquet',
  price: 220.5,
  priceAfterDiscount: 199.5,
  quantity: 50,
  sold: 120,
  rateAvg: 4.5,
  rateCount: 8,
  images: [
    '/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png',
    '/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png',
    '/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png',
    '/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png',
  ],
  imgCover: '/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png',
  category: 'Bouquets',
  occasion: 'Wedding',
  isSuperAdmin: false,
  isInWishlist: false,
  favoriteId: null,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  __v: 0,
};

export default function ProductPage() {
  // Translations

  const t = useTranslations('pages.products');

  // State

  const [selectedImage, setSelectedImage] = useState(0);

  // Render

  return (
    <div className="mx-auto w-11/12 space-y-16 py-12">
      {/* Product Details Section */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <Image
              src={mockProduct.images[selectedImage]}
              alt={mockProduct.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-3">
            {mockProduct.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  'relative h-24 overflow-hidden rounded-lg border-2 transition-all',
                  selectedImage === index
                    ? 'border-maroon-600 dark:border-pink-400'
                    : 'border-zinc-200 dark:border-zinc-700',
                )}
              >
                <Image
                  src={image}
                  alt={`${mockProduct.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-maroon-700 dark:text-pink-200">
              {mockProduct.title}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Rating rate={mockProduct.rateAvg} />
                </div>
                <span className="text-sm font-semibold text-maroon-700 dark:text-pink-300">
                  {t('details.rating', { rate: mockProduct.rateAvg })}
                </span>
              </div>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {t('details.ratings', { count: mockProduct.rateCount })}
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-maroon-700 dark:text-pink-200">
              {mockProduct.priceAfterDiscount} EGP
            </span>
            <del className="text-xl text-zinc-400 dark:text-zinc-500">
              {mockProduct.price} EGP
            </del>
            <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {t('details.off', {
                percentage: Math.round(
                  ((mockProduct.price - mockProduct.priceAfterDiscount) /
                    mockProduct.price) *
                  100,
                ),
              })}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {mockProduct.description}
          </p>

          <div className="flex gap-4">
            <Button className="flex-1 gap-2 rounded-lg bg-maroon-600 py-6 text-lg font-semibold text-white hover:bg-maroon-700 dark:bg-pink-500 dark:text-maroon-900 dark:hover:bg-pink-600">
              <ShoppingCart className="h-5 w-5" />
              {t('details.addToCart')}
            </Button>
            <Button
              variant="outline"
              className="gap-2 rounded-lg border-maroon-600 py-6 text-maroon-600 hover:bg-maroon-50 dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-950"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">
                {t('details.category')}:
              </span>
              <span className="font-semibold text-maroon-700 dark:text-pink-300">
                {mockProduct.category}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">
                {t('details.occasion')}:
              </span>
              <span className="font-semibold text-maroon-700 dark:text-pink-300">
                {mockProduct.occasion}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">
                {t('details.inStock')}:
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {mockProduct.quantity} {t('details.units')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Reviews Section */}
      <section>
        <div className="mb-4 border-b border-zinc-200 pb-4 dark:border-zinc-700">
          <div className="flex justify-start px-0!">
            <SectionHeader title="" description={t('reviews.title')} />
          </div>
          <div className="mt-2 items-center gap-2">
            <span className="block text-lg font-semibold text-maroon-700 dark:text-pink-300">
              {t('details.generalRating')}
            </span>
            <span className="text-lg font-semibold">{mockProduct.rateAvg}</span>
            <span className="px-2 text-xs text-zinc-500 dark:text-zinc-400">
              {t('details.ratings', { count: mockProduct.rateCount })}
            </span>
            <div className="flex items-center gap-1">
              <Rating rate={mockProduct.rateAvg} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ReviewsList />

          <AddReviewForm productId={mockProduct._id} />
        </div>
      </section>

      <RelatedProductsCarousel />
    </div>
  );
}
