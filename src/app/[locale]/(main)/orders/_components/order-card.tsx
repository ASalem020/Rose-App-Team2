import { Order } from '@/lib/types/order';
import ShowToggle from './show-toggle';

/**
 * OrderCard Component
 
 */
export default function OrderCard({
  order,
}: {
  order: Order;
}) {
  /**
   * Format date to readable format
   */
  const formattedDate = new Date(
    order.createdAt,
  ).toLocaleString();

  /**
   * Status badge styles
   */
  const statusStyles: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-700',
    Done: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  /**
   * Payment badge styles
   */
  const paymentStyles: Record<string, string> = {
    Paid: 'bg-green-100 text-green-700',
    'Not Paid': 'bg-red-100 text-red-700',
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-lg">
      {/*  Header  */}
      <div className="flex items-center justify-between bg-red-700 px-6 py-3 text-white">
        <span className="font-semibold">
          Order #{order._id}
        </span>

        <span className="text-sm">
          Created at {formattedDate}
        </span>
      </div>

      {/* Body  */}
      <div className="space-y-6 p-6">
        {/* Order Status (top right) */}
        <div className="flex justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[order.status] ||
              'bg-gray-100 text-gray-700'
            }`}
          >
            {order.status}
          </span>
        </div>

        {/*  Summary Section*/}
        <div className="space-y-4">
          {/* Total Price + Payment Status */}
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">
              Total Price: {order.totalPrice} EGP
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                paymentStyles[order.paymentStatus] ||
                'bg-gray-100 text-gray-700'
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>

          {/* Payment Method */}
          <p className="text-sm text-gray-600">
            Payment Method: {order.paymentMethod}
          </p>

          {/* Delivery Status */}
          <p className="text-sm text-gray-600">
            Delivery Status: {order.deliveryStatus}
          </p>
        </div>

        {/*Items Section */}
        <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
          {/* Section title */}
          <h4 className="mb-4 text-sm font-medium text-gray-700">
            Order Items
          </h4>

          {/* Items list with toggle */}
          <ShowToggle items={order.items} />
        </div>
      </div>
    </div>
  );
}
