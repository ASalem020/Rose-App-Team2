import { cn } from '@/lib/utils/tailwind-merge';
import { DashboardProducts } from '@/lib/types/dashboard-products';
import { getTranslations } from 'next-intl/server';

export default async function LowStockCard() {
  // ^ Translations
  const t = await getTranslations('dashboard');

  // ^ fetch data
  const response = await fetch(
    `${process.env.API_URL}/products?sort=quantity`,
  );
  const data: DashboardProducts = await response.json();

  return (
    <>
      {data?.products?.map(product => (
        <div
          key={product._id}
          className="mb-2.5 flex items-center justify-between border-b border-gray-200 pb-2.5"
        >
          <h3 className="max-w-[220px] truncate text-xl capitalize text-zinc-800">
            {product.title}
          </h3>
          <span
            className={cn(
              'text-xl capitalize',
              product.quantity <= 5
                ? 'text-red-600'
                : 'text-zinc-800',
            )}
          >
            {Math.max(product.quantity, 0)}
            {'  '}
            {t('products')}
          </span>
        </div>
      ))}
    </>
  );
}
