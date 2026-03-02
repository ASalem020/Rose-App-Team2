import { DashboardOverall } from '@/lib/types/dashboard';

type Props = {
  overall: DashboardOverall;
};

export default function StatsCards({ overall }: Props) {
  const cards = [
    { title: 'Total Orders', value: overall.totalOrders },
    { title: 'Total Revenue', value: overall.totalRevenue },
    {
      title: 'Total Products',
      value: overall.totalProducts,
    },
    {
      title: 'Total Categories',
      value: overall.totalCategories,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {cards.map(card => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-6 shadow-md"
        >
          <h3 className="text-sm text-gray-500">
            {card.title}
          </h3>
          <p className="mt-2 text-2xl font-semibold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
