import { useTranslations } from 'next-intl';
import TitleComponents from './title';
import TopSellingCard from './top-selling-card';
import { Suspense } from 'react';
import CardSkeleton from './skeleton/card-skeleton';

export default function TopSellingProducts() {
  // ^ Translations
  const t = useTranslations('dashboard');

  return (
    <div className="flex max-h-112 flex-col rounded-2xl bg-white p-6">
      <TitleComponents title={t('top-selling-products')} />
      <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Suspense fallback={<CardSkeleton />}>
          <TopSellingCard />
        </Suspense>
      </div>
    </div>
  );
}
