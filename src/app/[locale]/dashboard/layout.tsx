import Breadcrumbs from './_components/breadcrumbs';
import DashboardSidebar from './_components/dashboard-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
