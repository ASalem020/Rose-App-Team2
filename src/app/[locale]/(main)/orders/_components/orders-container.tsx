import { Order } from '@/lib/types/order'
import OrderCard from './order-card'

type Props = {
  orders: Order[]
}

/**
 * OrdersContainer
 * ---------------
 * This component receives the orders list
 * and renders an OrderCard for each order.
 */
export default function OrdersContainer({ orders }: Props) {
  // If no orders exist, show empty state message
  if (!orders || orders.length === 0) {
    return (
      <div className="container py-10">
        <p className="text-center text-gray-500">
          No orders found.
        </p>
      </div>
    )
  }

  return (
    <div className="container space-y-6 py-10">
      {/* Loop through orders and render a card for each one */}
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  )
}