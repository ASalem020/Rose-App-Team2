import Image from 'next/image';
import type { OrderItem } from '@/lib/types/order';

/**
 * OrderItemComponent
 * -------------------
 * Displays a single product inside an order card.
 * Shows:
 */
export default function OrderItemComponent({
  item,
}: {
  item: OrderItem;
}) {
  /**
   * Build product image URL safely
   * Fallback to placeholder if image is missing
   */
  const imageUrl = item.product?.image
    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.product.image}`
    : '/placeholder.png';

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
      {/* Product Image */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={item.product?.title || 'Product image'}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <p className="text-sm font-medium">
          {item.product?.title}
        </p>

        <p className="text-xs text-gray-500">
          Qty: {item.quantity}
        </p>
      </div>

      {/* Item Price */}
      <p className="text-sm font-semibold">
        {item.price} EGP
      </p>
    </div>
  );
}
