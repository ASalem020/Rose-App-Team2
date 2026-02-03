import ProductGallery from './product-gallery';
import { getProductDetailsService } from '@/lib/services/product-details.service';
import { Product } from '@/lib/types/product';
import ProductContent from './product-content';

type SkeletonProps = {
  params: { id: string };
};

export default async function ProductDetails({
  params,
}: SkeletonProps) {
  // Fetch product details
  const product: Product = await getProductDetailsService(
    params.id,
  );

  return (
    <section className="container m-auto mb-12 mt-16 flex h-128 flex-row gap-16">
      {/* Product Gallery */}
      <ProductGallery product={product} />

      {/* Product Details */}
      <ProductContent product={product} />
    </section>
  );
}
