import HeaderComponent from './_components/header-components';
import SideBarAccount from './_components/sidebar-account';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="my-7 container mx-auto">
      {/* title */}
      <HeaderComponent />
      <div className="container mx-auto grid h-screen grid-cols-4 gap-9">
      {/* sidebar */}
        <div className="col-span-1 ">
          <SideBarAccount />
        </div>

        {/* content */}
        <div className="col-span-3 bg-white">
          {children}
        </div>

      </div>
    </div>
  );
}
