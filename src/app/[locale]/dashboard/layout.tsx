import { getServerSession } from 'next-auth';
import Breadcrumbs from './_components/breadcrumbs';
import DashboardSidebar from './_components/dashboard-sidebar';
import { authOptions } from '@/auth';
import { redirect } from '@/i18n/navigation';
import { getLocale } from 'next-intl/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // another way to protect the dashboard route and its nested routes, in addition to the middleware protection, to prevent unauthorized access in case the middleware is bypassed for any reason
  // Variables
  const session = await getServerSession(authOptions);
  const locale = await getLocale();

  if (!session) {
    return redirect({ href: '/unauthorized', locale });
  }

  return (
    <div className="dashboard-layout grid grid-cols-5">
      <DashboardSidebar className="col-span-1" />
      <div className="content col-span-4">
        <Breadcrumbs />
        <main className="min-h-screen bg-zinc-50 px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
