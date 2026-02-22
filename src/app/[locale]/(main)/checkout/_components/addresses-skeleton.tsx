import React from 'react';
import AddressCardSkeleton from './address-card-skeleton';

export default function AddressesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="container flex max-h-[20.9375rem] flex-col gap-3 overflow-y-auto">
        <AddressCardSkeleton />
        <AddressCardSkeleton />
        <AddressCardSkeleton />
      </div>
    </div>
  );
}
