'use client'

import { useState } from 'react'
import { OrderItem } from '@/lib/types/order'
import OrderItemComponent from './order-product-item'

type Props = {
  items: OrderItem[]
}

/**
 * ShowToggle
 * ----------
 * Controls showing first 3 items or all items.
 */
export default function ShowToggle({ items }: Props) {
  // State to control whether all items are visible
  const [showAll, setShowAll] = useState(false)

  // Decide which items to show based on state
  const visibleItems = showAll ? items : items.slice(0, 3)

  return (
    <div className="space-y-2">
      {/* Render visible items */}
      {visibleItems.map(item => (
        <OrderItemComponent key={item._id} item={item} />
      ))}

      {/* Toggle button only appears if there are more than 3 items */}
      {items.length > 3 && (
        <button
          className="text-sm text-red-600 underline"
          onClick={() => setShowAll(prev => !prev)}
        >
          {showAll ? 'Show Less' : 'Show All'}
        </button>
      )}
    </div>
  )
}