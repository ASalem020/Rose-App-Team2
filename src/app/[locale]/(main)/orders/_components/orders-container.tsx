import { Order } from '@/lib/types/order';
import OrderCard from './order-card';

type Props = {
  orders: Order[];
};

/**
 * Maps over orders and renders cards
 */
export default function OrdersContainer({ orders }: Props) {
  console.log('Orders received in container:', orders);

  if (!orders || orders.length === 0) {
    return (
      <div className="container py-10">
        <p className="text-center text-gray-500">
          No orders found.
        </p>
      </div>
    );
  }

  return (
    <div className="container space-y-6 py-10">
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
