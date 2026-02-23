import { useTranslations } from 'next-intl';
import TitleComponents from './title';
import TopSellingCard from './top-selling-card';

export default function TopSellingProducts() {
  // ^ Translations
  const t = useTranslations('dashboard');

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <TitleComponents title={t('top-selling-products')} />
      <TopSellingCard />
    </div>
  );
}
