import SideBarLinks from './sidebar-links';
import Logout from './logout';

export default function SideBarAccount() {
  return (
    <div className="flex flex-col justify-between min-h-screen bg-zinc-50 p-1 border-1 border-zinc-100">
      <SideBarLinks />
      <Logout />
    </div>
  );
}
