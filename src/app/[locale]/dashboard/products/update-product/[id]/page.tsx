import React, { Suspense } from 'react';
import UpdateProductForm from './_components/update-product-form';
import { Product } from '@/lib/types/product';
import { getProductDetailsService } from '@/lib/services/product-details.service';
import { getTranslations } from 'next-intl/server';
import UpdateProductFormSkeleton from './_skeleton/update-product-form-skeleton';

export default async function UpdateProduct({
  params,
}: {
  params: { id: string };
}) {
  const t = await getTranslations(
    'pages.dashboard.products-page.update-product',
  );

  const product: Product = await getProductDetailsService(
    params.id,
  );

  return (
    <div className="flex flex-row bg-zinc-50">
      <div className="w-1/5 bg-white">Sidebar</div>

      <div className="w-4/5 bg-zinc-100 p-6">
        <h2 className="mb-6 flex gap-1 text-2xl font-semibold text-zinc-800">
          <span className="shrink-0">{t('header')}:</span>
          <span className="truncate" title={product.title}>
            {product.title}
          </span>
        </h2>

        <div className="mb-20 rounded-2xl bg-white">
          <Suspense
            fallback={<UpdateProductFormSkeleton />}
          >
            <UpdateProductForm product={product} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
