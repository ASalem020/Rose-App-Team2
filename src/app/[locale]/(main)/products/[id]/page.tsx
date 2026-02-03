import { Suspense } from 'react';
import ProductDetails from './_components/product-details';
import ProductDetailsSkeleton from './_components/product-details-skeleton';

type PageProps = {
  params: { id: string };
};

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  return (
    <div>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
}
