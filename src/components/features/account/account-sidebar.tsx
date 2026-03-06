// Imports


import AccountSidebarLinks from './account-sidebar-links';
import Logout from './logout';


// Types


type Props = {
  /** Passed through to AccountSidebarLinks — see its docs for usage */
  basePath?: string;
};


// Component


/**
 * AccountSidebar - Full sidebar for the account section
 *
 * Composes AccountSidebarLinks (nav) + Logout (action) into one sidebar.
 * Accepts basePath so the active-link highlight works in both the
 * main site and the dashboard.
 *
 * @param basePath - Optional path prefix forwarded to AccountSidebarLinks
 */
export default function AccountSidebar({ basePath }: Props) {

  // Render


  return (
    <div className="flex flex-col justify-between min-h-screen bg-zinc-50 p-1 border border-zinc-100">
      <AccountSidebarLinks basePath={basePath} />
      <Logout />
    </div>
  );
}
