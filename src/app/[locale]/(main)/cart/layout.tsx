import RelatedProductsSkeleton from '@/components/skeleton/related-products-skeleton';
import { Suspense } from 'react';
import RecommendedProductsCarousel from '../../../../components/shared/recommended-products';

type CartLayoutProps = {
  children: React.ReactNode;
  checkout: React.ReactNode;
};

export default function CartLayout({
  children,
  checkout,
}: CartLayoutProps) {
  return (
    <div className="m-auto">
      <div className="mx-20 my-12 flex flex-row gap-10">
        <div className="w-2/3">{children}</div>
        <div className="w-2/5">{checkout}</div>
      </div>
      <div className="mx-auto w-11/12 pb-10">
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RecommendedProductsCarousel />
        </Suspense>
      </div>
    </div>
  );
}
