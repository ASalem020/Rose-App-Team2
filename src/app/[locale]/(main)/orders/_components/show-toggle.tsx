'use client';

import { useState } from 'react';
import { OrderItem } from '@/lib/types/order';
import OrderItemComponent from './order-product-item';

/**
 * Controls showing first 3 items or all items
 */
export default function ShowToggle({
  items,
}: {
  items: OrderItem[];
}) {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, 3);

  console.log('Visible items:', visibleItems.length);

  return (
    <div className="space-y-2">
      {visibleItems.map((item, index) => (
        <OrderItemComponent key={index} item={item} />
      ))}

      {items.length > 3 && (
        <button
          className="text-sm text-primary underline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      )}
    </div>
  );
}
