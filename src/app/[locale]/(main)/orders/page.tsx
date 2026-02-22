import { redirect } from 'next/navigation'
import OrdersContainer from './_components/orders-container'
import { getUserOrdersAction } from '@/lib/services/orders.service'
import { OrdersResponse } from '@/lib/types/order'

/**
 * OrdersPage
 * Fetches user orders from backend
 */
export default async function OrdersPage() {
  try {
    const data: OrdersResponse = await getUserOrdersAction()

    return (
      <OrdersContainer orders={data.orders} />
    )
  } catch {
    redirect('/login')
  }
}