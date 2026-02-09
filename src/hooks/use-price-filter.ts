'use client';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

export function usePriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('priceFrom') ?? '';
  const to = searchParams.get('priceTo') ?? '';

  const setPrice = (nextFrom?: string, nextTo?: string) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (nextFrom && Number(nextFrom) > 0) {
      params.set('priceFrom', nextFrom);
    } else {
      params.delete('priceFrom');
    }

    if (nextTo && Number(nextTo) > 0) {
      params.set('priceTo', nextTo);
    } else {
      params.delete('priceTo');
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const resetPrice = () => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );
    params.delete('priceFrom');
    params.delete('priceTo');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return {
    from,
    to,
    setPrice,
    resetPrice,
  };
}
