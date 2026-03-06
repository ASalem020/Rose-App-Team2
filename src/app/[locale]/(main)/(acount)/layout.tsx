// Imports


import AccountHeader from '@/components/features/account/account-header';
import AccountSidebar from '@/components/features/account/account-sidebar';


// Layout


/**
 * Account layout for the main site (/profile, /change-password)
 *
 * Uses the shared AccountSidebar without a basePath so links
 * point to /profile and /change-password (the standard user-facing routes).
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-7 container mx-auto">

      {/* Page heading */}
      <AccountHeader />

      <div className="container mx-auto grid h-screen grid-cols-4 gap-9">

        {/* Sidebar */}
        <div className="col-span-1">
          <AccountSidebar />
        </div>

        {/* Content */}
        <div className="col-span-3 bg-white">
          {children}
        </div>

      </div>
    </div>
  );
}
