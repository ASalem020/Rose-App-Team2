import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Search as SearchIcon,
  ChevronDown,
  Heart,
  ShoppingCart,
  Bell,
  Home,
  Gift,
  LayoutGrid,
  PartyPopper,
  Phone,
  Info,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { AccountDropdown } from '@/components/shared/account-dropdown';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home, active: true },
  { href: '/products', label: 'Products', icon: Gift },
  {
    href: '/categories',
    label: 'Categories',
    icon: LayoutGrid,
  },
  {
    href: '/occasions',
    label: 'Occasions',
    icon: PartyPopper,
  },
  { href: '/contact', label: 'Contact', icon: Phone },
  { href: '/about', label: 'About', icon: Info },
];

export function Header() {
  return (
    <header className="w-full bg-white font-sans shadow-sm">
      {/* Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png"
            alt="Rose Logo"
            width={70}
            height={70}
            className="h-auto w-auto object-contain"
          />
        </Link>

        {/* Deliver To */}
        <div className="ml-8 hidden items-center space-x-2 lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 text-maroon-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400">
              Deliver to:
            </span>
            <span className="text-sm font-bold text-maroon-700 underline decoration-maroon-700/30 underline-offset-4">
              Cairo
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mx-8 hidden max-w-2xl flex-1 md:block">
          <div className="group relative">
            <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-maroon-500" />
            <Input
              type="text"
              placeholder="What awesome gift are you looking for?"
              className="h-12 w-full border-zinc-200 bg-white pl-11 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-maroon-500/20 dark:bg-white dark:pl-11 dark:text-zinc-900 dark:placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Right Section: Account, Wishlist, Cart, Bell, Language */}
        <div className="flex items-center space-x-6">
          {/* Account Dropdown */}
          <AccountDropdown
            trigger={
              <button className="flex items-center space-x-1 transition-opacity hover:opacity-80">
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] text-zinc-400">
                    Hello
                  </span>
                  <span className="text-sm font-bold text-maroon-800">
                    Jonathan
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </button>
            }
          />

          {/* Divider */}
          <div className="h-8 w-px bg-zinc-200" />

          {/* Social/Utility Icons */}
          <div className="flex items-center space-x-4">
            {/* wishlist button */}
            <button className="text-zinc-500 transition-colors hover:text-maroon-600">
              <Heart className="h-6 w-6 font-light" />
            </button>

            {/* cart button */}
            <button className="relative text-zinc-500 transition-colors hover:text-maroon-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                8
              </span>
            </button>

            {/* notification button */}
            <button className="relative text-zinc-500 transition-colors hover:text-maroon-600">
              <Bell className="h-6 w-6" />
              <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                8
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-zinc-200" />

          {/* Language Toggle */}
          <Link
            href="#"
            className="text-base font-medium text-zinc-600 hover:text-maroon-600"
          >
            العربية
          </Link>
        </div>
      </div>

      {/* Navigation Bar (Maroon) */}
      <div className="w-full bg-maroon-900 text-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-center space-x-12 px-4 py-3">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-2 text-sm transition-colors hover:text-softPink-200 ${
                link.active
                  ? 'font-bold'
                  : 'font-medium opacity-90'
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
