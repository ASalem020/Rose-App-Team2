import { useTranslations } from 'next-intl';
import TitleComponents from './title';
import TopSellingCard from './top-selling-content';
import { Suspense } from 'react';
import CardSkeleton from './skeleton/card-skeleton';

export default function TopSellingProducts() {
  // ^ Translations
  const t = useTranslations('dashboard');

  return (
    <div className="flex max-h-112 flex-col bg-white p-6">
      {/* title */}
      <TitleComponents title={t('top-selling-products')} />
      {/* content */}
      <div className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Suspense fallback={<CardSkeleton />}>
          <TopSellingCard />
        </Suspense>
      </div>
    </div>
  );
}
