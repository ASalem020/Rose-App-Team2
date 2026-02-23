import TitleComponents from './title';
import LowStockCard from './low-stock-card';
import { useTranslations } from 'next-intl';

export default function LowStockProducts() {
  // ^ Translations
  const t = useTranslations('dashboard');

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <TitleComponents title={t('low-stock-products')} />
      <LowStockCard />
    </div>
  );
}
