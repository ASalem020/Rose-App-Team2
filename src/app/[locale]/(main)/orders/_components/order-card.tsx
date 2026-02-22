import { Order } from '@/lib/types/order'
import OrderCard from './order-card'

type Props = {
  orders: Order[]
}

/**
 * OrdersContainer
 * ----------------
 * Receives a list of orders and renders an OrderCard for each one.
 */
export default function OrdersContainer({ orders }: Props) {
  // If there are no orders, show empty state message
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
      {/* Loop through orders and render a card for each order */}
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  )
}