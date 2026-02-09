import { useTranslations } from 'next-intl'
import { OccasionCard } from './occasion-card'
import { Occasion } from '@/lib/types/occasion'

type Props = {
  // List of occasions fetched from the API
  occasions: Occasion[]
}

/**
 * OccasionFilter
 *
 * Renders the occasion filter section used on the products page.
 * Displays a scrollable grid of selectable occasion cards
 * based on the provided API data.
 *
 * This component is responsible for UI rendering only.
 * Selection state and filtering logic are handled by the parent layer.
 */
export function OccasionFilter({ occasions }: Props) {
  // Common translations (e.g. Reset)
  const tCommon = useTranslations('common')

  // Products page translations
  const tProducts = useTranslations('pages.products')

  return (
    <section className="space-y-4">
      {/* Section header with title and reset action */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">
          {tProducts('filters.occasion.title')}
        </h3>

        {/* Reset button clears selected occasions */}
        <button
          type="button"
          className="text-sm text-red-500 hover:underline"
        >
          {tCommon('reset')}
        </button>
      </div>

      {/* Scrollable grid containing occasion cards */}
      <div className="grid max-h-[320px] grid-cols-2 gap-3 overflow-y-auto pr-1">
        {occasions.map(occasion => {
          // Build the full image URL from the API response
          const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/uploads/${occasion.image}`

          return (
            <OccasionCard
              key={occasion._id}
              name={occasion.name}
              image={imageUrl}
            />
          )
        })}
      </div>
    </section>
  )
}
