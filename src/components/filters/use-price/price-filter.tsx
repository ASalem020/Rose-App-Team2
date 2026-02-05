'use client';

import { useEffect, useState } from 'react';
import { usePriceFilter } from '@/hooks/use-price-filter';
import { useTranslations } from 'next-intl';

export function PriceFilter() {
  const tCommon = useTranslations('common');
  const tProducts = useTranslations('pages.products');

  const { from, to, setPrice, resetPrice } =
    usePriceFilter();

  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);

  // sync URL (reload / back / forward)
  useEffect(() => {
    setLocalFrom(from);
    setLocalTo(to);
  }, [from, to]);

  const applyPrice = () => {
    if (
      localFrom &&
      localTo &&
      Number(localFrom) > Number(localTo)
    )
      return;
    setPrice(localFrom, localTo);
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">
          {tProducts('filters.price.title')}
        </h3>

        <button
          type="button"
          onClick={resetPrice}
          className="text-sm text-red-500 hover:underline"
        >
          {tCommon('reset')}
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            {tProducts('filters.price.from')}
          </label>
          <input
            type="number"
            min={0}
            value={localFrom}
            onChange={e => setLocalFrom(e.target.value)}
            onBlur={applyPrice}
            className="h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            {tProducts('filters.price.to')}
          </label>
          <input
            type="number"
            min={0}
            value={localTo}
            onChange={e => setLocalTo(e.target.value)}
            onBlur={applyPrice}
            className="h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </section>
  );
}
