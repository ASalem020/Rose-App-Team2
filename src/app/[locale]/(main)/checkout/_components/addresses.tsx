'use client';
import ErrorMessage from '@/components/shared/error-message';
import useAddress from '../_hooks/use-address';
import AddressCard from './address-card';
import LoadingComponent from '@/components/shared/loading-component';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import AddAddress from './add-address';
import { useTranslations } from 'next-intl';
import PriceSummary from './price-summary';

export default function Addresses() {
  // Translation
  const t = useTranslations(
    'pages.checkout.shipping-addresses',
  );

  // Hooks
  const { addresses, isLoading, error } = useAddress();

  return (
    <>
      {/* Title */}
      <h3 className="mb-6 text-2xl font-semibold md:text-3xl">
        {t('title')}
      </h3>

      {/* Addresses */}
      <div className="addresses flex flex-col gap-3">
        <div className="container flex max-h-[20.9375rem] flex-col gap-3 overflow-y-auto">
          {isLoading && <LoadingComponent />}

          {error && (
            <ErrorMessage message={error.message} />
          )}

          {addresses?.length === 0 ? (
            <p className="py-2 text-center text-base font-semibold text-zinc-500">
              {t('no-addresses')}
            </p>
          ) : (
            addresses?.map(address => (
              <AddressCard
                key={address._id}
                city={address.city}
                address={address.street}
                phone={address.phone}
              />
            ))
          )}
        </div>

        {/* Add Address */}
        <AddAddress />

        {/* Next Step */}
        <div className="flex">
          <Button className="ms-auto flex items-center gap-2.5">
            <span>{t('next')}</span>
            <span className="rtl:rotate-180">
              <MoveRight size={20} />
            </span>
          </Button>
        </div>
      </div>

      {/* Price Summary */}
      <PriceSummary />
    </>
  );
}
