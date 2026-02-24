'use client';
import { useState } from 'react';
import {
  EllipsisVertical,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils/tailwind-merge';

export default function Menu() {
  // State
  const [isOpen, setIsOpen] = useState(false);

  // Functions
  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <div className="menu relative">
      <div
        className="dropdown-trigger cursor-pointer"
        role="button"
        aria-label="dashboard sidebar dropdown menu trigger"
        onClick={handleToggle}
      >
        <EllipsisVertical
          size={18}
          className="text-zinc-800/50 duration-300 hover:text-zinc-800"
        />
      </div>
      <ul
        className={cn(
          'dropdown-menu absolute bottom-full left-full z-50 min-w-56 rounded-lg border border-zinc-100 bg-white shadow-md duration-300',
          isOpen
            ? 'visible opacity-100'
            : 'invisible opacity-0',
        )}
      >
        <li className="name p-3 text-sm font-semibold text-maroon-600">
          Hady Mohamed
        </li>
        <li className="flex cursor-pointer items-center gap-2 border-y border-black/[8%] p-3 text-sm font-medium text-zinc-700 duration-300 hover:bg-maroon-50 hover:text-maroon-600">
          <User size={16} />
          <span>Account</span>
        </li>
        <li className="flex cursor-pointer items-center gap-2 p-3 text-sm font-medium text-zinc-700 duration-300 hover:bg-maroon-50 hover:text-maroon-600">
          <LogOut size={16} />
          Logout
        </li>
      </ul>
    </div>
  );
}
