import { redirect } from 'next/navigation';
import { getDashboardStatistics } from '@/lib/services/dashboard.service';
import DashboardContainer from './_components/dashboard-container';

/**
 * - Fetching dashboard statistics from the backend
 * - Passing formatted data to the dashboard container
 * - Redirecting unauthenticated users to login
 */
export default async function DashboardPage() {
  try {
    /**
     * - detailed orders analytics
     */
    const data = await getDashboardStatistics();

    return (
      <DashboardContainer orders={data.statistics.orders} />
    );
  } catch {
    /**
     * If the request fails (e.g. invalid token),
     * redirect the user to the login page.
     */
    redirect('/login');
  }
}
