import { useTranslations } from 'next-intl';
import { OccasionCard } from './occasion-card';
import { Occasion } from '@/lib/types/occasion';

type Props = {
  occasions: Occasion[];
};

export function OccasionFilter({ occasions }: Props) {
  const tCommon = useTranslations('common');
  const tProducts = useTranslations('pages.products');

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">
          {tProducts('filters.occasion.title')}
        </h3>

        <button
          type="button"
          className="text-sm text-red-500 hover:underline"
        >
          {tCommon('reset')}
        </button>
      </div>

      {/* Cards */}
      <div className="grid max-h-[320px] grid-cols-2 gap-3 overflow-y-auto pr-1">
        {occasions.map(occasion => (
          <OccasionCard
            key={occasion._id}
            name={occasion.name}
            image={occasion.image}
          />
        ))}
      </div>
    </section>
  );
}
