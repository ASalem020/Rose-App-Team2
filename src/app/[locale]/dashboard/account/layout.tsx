// Imports


import AccountHeader from '@/components/features/account/account-header';


// Layout


/**
 * Dashboard account layout (/dashboard/account/*)
 *
 * No sidebar — content is shown inside a clean card.
 * Navigation between profile and change-password is handled
 * via inline links inside each form.
 */
export default function DashboardAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 space-y-6">

      {/* Content card */}
      <div className=" bg-white p-8  dark:bg-zinc-900">
        {children}
      </div>

    </div>
  );
}
