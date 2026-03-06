import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { RecommendedProductsAPIResponse } from '@/lib/types/product';
import SectionHeader from '@/components/shared/section-header';
import ProductItem from '../../app/[locale]/(main)/_components/product/product-item';
import { getTranslations } from 'next-intl/server';
import { getRecommendedProductsService } from '@/lib/services/recommended-products-service';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export default async function RecommendedProductsCarousel() {
  // Translation
  const t = await getTranslations('pages.cart');

  // Session
  const session = await getServerSession(authOptions);

  //   Fetch recommended products
  const recommendedProducts: RecommendedProductsAPIResponse =
    await getRecommendedProductsService(
      session?.user?._id || '',
    );

  return (
    <section className="space-y-6 py-10">
      <div className="flex justify-start">
        <SectionHeader
          title=""
          description={t('recommended')}
        />
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
            {recommendedProducts.recommendations.map(
              product => (
                <CarouselItem
                  key={product._id}
                  className="flex basis-1/2 items-center justify-center md:basis-1/3 lg:basis-1/4"
                >
                  <ProductItem
                    _id={product._id}
                    imgCover={product.imgCover}
                    title={product.title}
                    price={product.price}
                    priceAfterDiscount={
                      product.priceAfterDiscount
                    }
                    rateAvg={product.rateAvg}
                    href={`/products/${product._id}`}
                  />
                </CarouselItem>
              ),
            )}
          </CarouselContent>
        </div>

        <CarouselPrevious className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
        <CarouselNext className="size-11 bg-maroon-600 text-maroon-50 hover:bg-maroon-700 hover:text-white dark:bg-maroon-500" />
      </Carousel>
    </section>
  );
}
