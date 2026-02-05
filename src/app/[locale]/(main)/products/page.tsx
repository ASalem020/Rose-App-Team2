import React, { Suspense } from 'react';
import ProductsList from './_components/products-list';
import ProductsListSkeleton from './_skeleton/products-list.skeleton';

export default function ProductPage({ searchParams }: { searchParams: Record<string, string> }) {
  return <>
    <div className="container mx-auto px-5 mt-16 mb-44 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* Filtration */}
      {/* NOTE: Replace filtration text with filtration component */}
      <div className="filtration col-span-1 pr-6 border-b md:border-b-0 md:border-e border-zinc-100"> filtration </div>

      {/* Products */}
      <div className="products-content col-span-1 md:col-span-2 lg:col-span-3 pb-6 border-b border-zinc-100">
        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList queryString={new URLSearchParams(searchParams).toString()} />
        </Suspense>
      </div>
    </div>
  </>;
}
