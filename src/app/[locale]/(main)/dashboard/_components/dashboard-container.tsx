import { DashboardOrders } from '@/lib/types/dashboard';
import OrdersStatusChart from './orders-status-chart';
import RevenueChart from './revenue-chart';

type Props = {
  orders: DashboardOrders;
};

/**
 * Main layout wrapper for the dashboard charts.
 */
export default function DashboardContainer({
  orders,
}: Props) {
  return (
    <div className="container space-y-10 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Orders distribution by status */}
        <OrdersStatusChart data={orders.ordersByStatus} />

        {/* Revenue analytics (monthly & weekly) */}
        <RevenueChart
          dailyRevenue={orders.dailyRevenue}
          monthlyRevenue={orders.monthlyRevenue}
        />
      </div>
    </div>
  );
}
