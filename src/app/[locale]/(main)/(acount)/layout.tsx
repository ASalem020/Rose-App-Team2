import SideBarAccount from './_components/sidebar-account';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-gray-50 h-screen">
      <div className="container grid grid-cols-4 gap-4 ">
        <div className="col-span-1 bg-white">
          <SideBarAccount />
        </div>
        <div className="col-span-3 bg-white">{children}</div>
      </div>
    </div>
  );
}
