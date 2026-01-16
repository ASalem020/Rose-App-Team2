import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { FOOTER_LINKS } from '@/lib/constants/navigation';

export function Footer() {
  return (
    <footer className="w-full bg-zinc-800 py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-12 px-6 md:flex-row md:px-10">
        {/* Left Section: Logo & Copyright */}
        <div className="flex flex-col items-center space-y-4 md:items-start md:space-y-6">
          <Link href="/">
            <Image
              src="/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png"
              alt="Rose Logo"
              width={160}
              height={160}
              className="h-auto w-40 object-contain"
            />
          </Link>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold capitalize tracking-tight text-white/90">
              Rose E-Commerce App
            </h3>
            <p className="mt-1 text-xs capitalize text-zinc-500">
              All rights reserved | 2025
            </p>
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-lg font-bold capitalize text-softPink-300">
            Discover our website
          </h4>
          <nav className="grid grid-cols-1 gap-x-12 gap-y-2 text-sm text-zinc-300 sm:grid-cols-2">
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="capitalize transition-colors hover:text-softPink-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Newsletter */}
        <div className="flex w-full flex-col space-y-6 md:w-auto md:max-w-md">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold capitalize text-softPink-300">
              Get{' '}
              <span className="text-white">20% Off</span>{' '}
              Discount Coupon
            </h4>
            <p className="text-xs capitalize text-zinc-500">
              By subscribing to our newsletter
            </p>
          </div>

          <div className="relative flex w-full items-center">
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="h-12 w-full rounded-full border-none bg-zinc-700/50 pr-32 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-softPink-500/20"
            />
            <button className="absolute right-1 top-1 flex h-10 items-center gap-2 rounded-full bg-softPink-100 px-5 text-sm font-bold capitalize text-maroon-900 transition-all hover:bg-softPink-200 active:scale-95">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
