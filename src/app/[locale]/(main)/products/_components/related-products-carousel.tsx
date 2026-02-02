'use client';

// Imports

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import ProductCard from '../../_components/product/product-card';
import { Product } from '@/lib/types/product';
import SectionHeader from '@/components/shared/section-header';
import { useSearchParams } from 'next/navigation';
import { useGetRelatedProducts } from '../_hooks/use-get-related-products';
import { useTranslations } from 'next-intl';

// Types

// Component

/**
 * RelatedProductsCarousel - Component for displaying a carousel of related products
 *
 * Features:
 * - Fetches related products based on productId from search params
 * - Uses nested carousel for responsive display
 * - Displays individual ProductCard components
 * - Handles loading and empty states
 */
export default function RelatedProductsCarousel() {
    // Translation

    const t = useTranslations('pages.products.related');

    // Navigation

    const searchParams = useSearchParams();

    // Query

    const productId = searchParams.get('id') || '673e2e1f1159920171828153';
    const { data, isLoading } = useGetRelatedProducts(productId);

    // Variables

    const products = data?.relatedProducts;

    // Render

    if (isLoading)
        return (
            <div className="py-10 text-center text-maroon-700 dark:text-pink-300">
                {t('loading')}
            </div>
        );

    if (!products || !Array.isArray(products) || products.length === 0) return null;

    return (
        <section className="space-y-6">
            <div className="flex justify-start">
                <SectionHeader title="" description={t('title')} />
            </div>

            <Carousel
                opts={{
                    align: 'start',
                    loop: true,
                }}
                className="w-full"
            >
                <div className="w-full overflow-x-hidden overflow-y-visible">
                    <CarouselContent>
                        {products.map((product: Product) => (
                            <CarouselItem
                                key={product._id}
                                className="flex basis-1/2 items-center justify-center md:basis-1/3 lg:basis-1/4"
                            >
                                <ProductCard productInfo={product} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>

                <CarouselPrevious className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
                <CarouselNext className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
            </Carousel>
        </section>
    );
}
