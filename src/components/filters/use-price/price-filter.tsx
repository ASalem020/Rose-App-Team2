'use client'

import { useTranslations } from 'next-intl'
import { usePriceFilter } from '@/hooks/use-price-filter'

/**
 * PriceFilter
 
 */
export function PriceFilter() {
  // Common translations (e.g. Reset)
  const tCommon = useTranslations('common')

  // Products page translations
  const tProducts = useTranslations('pages.products')

  // Price filter state and actions from the hook
  const { from, to, setPrice, resetPrice } = usePriceFilter()

  return (
    <section className="space-y-4">
      {/* Section header with title and reset action */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">
          {tProducts('filters.price.title')}
        </h3>

        {/* Reset button clears the price filter */}
        <button
          type="button"
          onClick={resetPrice}
          className="text-sm text-red-500 hover:underline"
        >
          {tCommon('reset')}
        </button>
      </div>

      {/* Price range inputs */}
      <div className="grid grid-cols-2 gap-3">
        {/* From price input */}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            {tProducts('filters.price.from')}
          </label>

          <input
            type="number"
            min={0}
            value={from ?? ''}
            onChange={e => setPrice(e.target.value, to)}
            className="h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* To price input */}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            {tProducts('filters.price.to')}
          </label>

          <input
            type="number"
            min={0}
            value={to ?? ''}
            onChange={e => setPrice(from, e.target.value)}
            className="h-10 w-full rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </section>
  )
}
