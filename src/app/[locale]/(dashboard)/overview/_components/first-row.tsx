import { getAllStatistics } from '@/lib/services/statistics.service';
import { cn } from '@/lib/utils/tailwind-merge';
import {
  Package,
  CircleDollarSign,
  ClipboardList,
  ReceiptText,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function FirstRow() {
  // Translation
  const t = await getTranslations(
    'pages.dashboard.overview.row-1',
  );

  // Fetch data
  const data = await getAllStatistics();

  const { overall, categories } = data.statistics;

  // Stats array
  const stats = [
    {
      label: t('total-products-label'),
      value: overall.totalProducts,
      icon: (
        <Package size={30} className="text-maroon-600" />
      ),
      bgColor: 'bg-maroon-50',
      textColor: 'text-maroon-600',
    },
    {
      label: t('total-orders-label'),
      value: overall.totalOrders.toLocaleString(),
      icon: (
        <ReceiptText size={30} className="text-blue-600" />
      ),
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: t('total-categories-label'),
      value: overall.totalCategories,
      icon: (
        <ClipboardList
          size={30}
          className="text-purple-600"
        />
      ),
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: t('total-revenue-label'),
      value: Math.round(
        overall.totalRevenue,
      ).toLocaleString(),
      suffix: t('suffix'),
      icon: (
        <CircleDollarSign
          size={30}
          className="text-emerald-600"
        />
      ),
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
  ];

  return (
    <section className="container my-6 me-6 ms-4 flex h-80 flex-row gap-6">
      <div className="w-5/12 rounded-2xl bg-white p-6 shadow-sm">
        {/* Overview Cards */}
        <div className="grid h-full grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                'flex h-32 flex-col rounded-xl p-4',
                stat.bgColor,
              )}
            >
              <div className="flex flex-col gap-3">
                <div>{stat.icon}</div>
                <div className="flex flex-col">
                  <div>
                    {/* State value */}
                    <span
                      className={cn(
                        'text-2xl font-semibold',
                        stat.textColor,
                      )}
                    >
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span
                        className={cn(
                          'ms-1 font-medium',
                          stat.textColor,
                        )}
                      >
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  {/* Label */}
                  <span className="font-medium text-zinc-800">
                    {stat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories overview */}
      <div className="flex h-80 flex-1 flex-col gap-4 rounded-2xl bg-white p-6">
        <h2 className="text-2xl font-semibold text-zinc-800">
          {t('header')}
        </h2>
        {/* Categories list */}
        <div className="overflow-auto pr-2">
          {categories.map(category => (
            <div
              key={category._id}
              className="flex flex-row items-center justify-between border-b py-3 text-zinc-800 last:border-0"
            >
              <p className="capitalize">{category.name}</p>
              <span className="rounded-lg bg-zinc-100 px-3 py-1 text-sm font-medium">
                {category.totalProducts}
                {t('products-label')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
