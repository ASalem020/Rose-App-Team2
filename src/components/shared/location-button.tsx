'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AddressModal from '@/components/features/address/address-modal';
import type { Address } from '@/lib/types/address';

interface LocationButtonProps {
  deliverToText: string;
  locationText: string;
}

export function LocationButton({ deliverToText, locationText }: LocationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Load selected address from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('selectedAddress');
      if (saved) {
        setSelectedAddress(JSON.parse(saved));
      }
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    try {
      localStorage.setItem('selectedAddress', JSON.stringify(address));
    } catch (e) {
      // ignore storage errors
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-start rtl:items-end transition-opacity hover:opacity-80"
      >
        <span className="text-sm capitalize text-zinc-400 dark:text-zinc-500">
          {deliverToText}
        </span>
        <span className="text-sm font-bold capitalize text-maroon-700 underline decoration-maroon-700/30 underline-offset-4 dark:text-zinc-100 dark:decoration-zinc-100/30">
          {selectedAddress ? selectedAddress.city : locationText}
        </span>
      </button>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-xl w-full max-h-md p-0 overflow-auto">
          <div className="p-6">
            <AddressModal
              onAddressSelect={handleAddressSelect}
              selectedAddressId={selectedAddress?.id ?? null}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
