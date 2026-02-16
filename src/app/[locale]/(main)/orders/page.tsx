import { redirect } from 'next/navigation';
import OrdersContainer from './_components/orders-container';
import { OrdersResponse } from '@/lib/types/order';
import { getUserOrdersAction } from '@/lib/services/orders.services';

/**
 * OrdersPage
 * ----------
 * Server Component responsible for:
 * - Fetching user orders from backend
 */
export default async function OrdersPage() {
  const data: OrdersResponse = await getUserOrdersAction();

  /**
   * If backend returns error (e.g. invalid token),
   * redirect user to login page.
   */
  if ('error' in data) {
    redirect('/login');
  }

  /**
   * Ensure orders is always an array
   * Prevents runtime crash if API shape changes
   */
  const orders = Array.isArray(data.orders)
    ? data.orders
    : [];

  return <OrdersContainer orders={orders} />;
}
