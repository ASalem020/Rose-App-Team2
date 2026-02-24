import { Suspense } from 'react';
import ProductDetails from './_components/product-details';
import ProductDetailsSkeleton from './_components/product-details-skeleton';
import ReviewsList from './_components/reviews-list';
import AddReviewForm from './_components/add-review-form';
import RelatedProductsCarousel from './_components/related-products-carousel';
import ReviewsSkeleton from '@/components/skeleton/reviews-skeleton';
import AddReviewSkeleton from '@/components/skeleton/add-review-skeleton';
import RelatedProductsSkeleton from '@/components/skeleton/related-products-skeleton';


type PageProps = {
  params: { id: string };
};

export default async function ProductDetailsPage({
  params,
}: PageProps) {
 
  return (
    <div>
      {/* Product details section */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>

      {/* Reviews section */}
      <div className='w-11/12 mx-auto border-t-2 py-10 grid grid-cols-3 gap-4'>
        <div className='col-span-2'>

          <Suspense fallback={<ReviewsSkeleton />}>
            <ReviewsList />
          </Suspense>
        </div>
        <div className='col-span-1'>
          <Suspense fallback={<AddReviewSkeleton />}>
            <AddReviewForm productId={params.id} />
          </Suspense>
        </div>
      </div>
      
      {/* Related products section */}
      <div className='w-11/12 mx-auto pb-10'>
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProductsCarousel />
        </Suspense>
      </div>
    </div>
  );
}
