'use client';
import { cn } from '@/lib/utils/tailwind-merge';
import { Phone } from 'lucide-react';

type AddressCardProps = {
  city: string;
  address: string;
  phone: string;
  selected?: boolean;
  onClick: () => void;
};

export default function AddressCard({
  city,
  address,
  phone,
  selected,
  onClick,
}: AddressCardProps) {
  return (
    <div
      data-selected={selected}
      onClick={onClick}
      className="address-card group: cursor-pointer rounded-xl border border-zinc-300 px-4 py-3.5 duration-300 hover:bg-zinc-50 data-[selected=true]:bg-maroon-600 data-[selected=true]:text-white"
    >
      {/* Header */}
      <div className="header flex items-center justify-between">
        {/* City */}
        <h4
          className={cn(
            'text-xl font-semibold md:text-2xl',
            selected ? 'text-white' : 'text-zinc-800',
          )}
        >
          {city}
        </h4>

        {/* Phone */}
        <div className="phone flex items-center gap-2.5">
          <span
            className={cn(
              'icon flex size-8 items-center justify-center rounded-full',
              selected
                ? 'bg-white text-maroon-600'
                : 'bg-maroon-600 text-white',
            )}
          >
            <Phone size={20} />
          </span>
          <span
            className={cn(
              'number',
              selected ? 'text-white' : 'text-zinc-500',
            )}
          >
            {phone}
          </span>
        </div>
      </div>

      {/* Address */}
      <p
        className={cn(
          'address mt-1.5 w-fit rounded-full px-3 py-1 text-sm font-medium md:text-base',
          selected
            ? 'bg-zinc-800 text-white'
            : 'bg-zinc-100 text-zinc-800',
        )}
      >
        {address}
      </p>
    </div>
  );
}
