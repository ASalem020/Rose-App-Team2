'use client';
import ErrorMessage from '@/components/shared/error-message';
import useAddress from '../_hooks/use-address';
import AddressCard from './address-card';
import LoadingComponent from '@/components/shared/loading-component';

export default function Addresses() {
  // Hooks
  const { addresses, isLoading, error } = useAddress();

  return (
    <div className="addresses">
      <div className="container flex max-h-[20.9375rem] flex-col gap-3 overflow-y-auto">
        {isLoading && <LoadingComponent />}

        {error && <ErrorMessage message={error.message} />}

        {addresses?.map(address => (
          <AddressCard
            key={address._id}
            city={address.city}
            address={address.street}
            phone={address.phone}
          />
        ))}
      </div>
    </div>
  );
}
