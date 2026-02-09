'use client'

import { usePathname, Link } from '@/i18n/navigation';
import { CircleUser, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SideBarAccount() {

  const pathname = usePathname()

  return (
      <div className="px-6 pt-12 flex flex-col justify-center space-y-3">

        {/* profile */}
        <Link
          href={"/profile"}
          className={`flex items-center gap-3 p-4  ${pathname === "/profile"
              ? "text-blue-600 bg-blue-100/70 "
              : "hover:bg-gray-200/50"
            }`}
        >
          <CircleUser />
          Profile
        </Link>

        {/* change-password */}
        <Link
          href={"/change-password"}
          className={`flex items-center gap-3 p-4  ${pathname === "/change-password"
              ? "text-blue-600 bg-blue-100/70 "
              : "hover:bg-gray-200/50"
            }`}
        >
          <Lock />
          Change Password
        </Link>

        {/* logout */}
        <Button
          className="flex gap-2.5 absolute bottom-12 cursor-pointer text-red-600 font-semibold bg-red-100 hover:bg-red-200/70 py-3 px-6 w-56"
        >
          <LogOut />
          LogOut
        </Button>

      </div>
  );
}

