// Temporary: reads priceFrom / priceTo from URL.
// Will be replaced once Products page integration is ready.
'use client';

import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const priceFrom = searchParams.get('priceFrom');
  const priceTo = searchParams.get('priceTo');

  return (
    <main className="p-6">
      <h1>Products Page (WIP)</h1>

      <pre className="mt-4 text-sm">
        priceFrom: {priceFrom ?? '—'}
        {'\n'}
        priceTo: {priceTo ?? '—'}
      </pre>
    </main>
  );
}
