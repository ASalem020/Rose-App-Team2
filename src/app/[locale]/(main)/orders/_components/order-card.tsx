import { Order } from '@/lib/types/order'
import { formatDate } from '@/lib/utils/format-date'
import ShowToggle from './show-toggle'

type Props = {
  order: Order
}

/**
 * OrderCard Component
 * -------------------
 * Renders a single order with:
 * - Header (order number + date)
 * - Status badge
 * - Summary section
 * - Order items list
 */
export default function OrderCard({ order }: Props) {
  /**
   * Format order creation date
   */
  const formattedDate = formatDate(order.createdAt)

  /**
   * Map order state to badge styles
   */
  const statusStyles: Record<string, string> = {
    pending: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-lg">
      
      {/* Header Section */}
      <div className="flex items-center justify-between bg-red-700 px-6 py-3 text-white text-2xl font-semibold">
        <span>
          Order {order.orderNumber}
        </span>

        <span className="text-sm font-normal">
          Created at {formattedDate}
        </span>
      </div>

      {/* Body Section */}
      <div className="space-y-6 p-6">
        
        {/* Order Status Badge */}
        <div className="flex justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[order.state] ||
              'bg-gray-100 text-gray-700'
            }`}
          >
            {order.state}
          </span>
        </div>

        {/* Summary Section */}
        <div className="space-y-4">
          
          {/* Total Price + Payment Status */}
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">
              Total Price: {order.totalPrice} EGP
            </h3>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
              {order.isPaid ? 'Paid' : 'Not Paid'}
            </span>
          </div>

          {/* Payment Type */}
          <p className="text-sm text-gray-600">
            Payment Type: {order.paymentType}
          </p>

          {/* Delivery Status */}
          <p className="text-sm text-gray-600">
            Delivery Status:{' '}
            {order.isDelivered ? 'Delivered' : 'Pending'}
          </p>
        </div>

        {/* Order Items Section */}
        <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
          <h4 className="mb-4 text-sm font-medium text-gray-700">
            Order Items
          </h4>

          {/* Toggle component handles showing first 3 items or all items */}
          <ShowToggle items={order.orderItems} />
        </div>
      </div>
    </div>
  )
}