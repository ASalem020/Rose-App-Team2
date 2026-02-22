'use client';
import ErrorMessage from '@/components/shared/error-message';
import useAddress from '../_hooks/use-address';
import AddressCard from './address-card';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import AddAddress from './add-address';
import { useTranslations } from 'next-intl';
import {
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useState } from 'react';
import { CheckoutSchemaType } from '@/lib/types/checkout';
import AddressesSkeleton from './addresses-skeleton';

type AddressesProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setValue: UseFormSetValue<CheckoutSchemaType>;
  getValues: UseFormGetValues<CheckoutSchemaType>;
};

export default function Addresses({
  setStep,
  setValue,
  getValues,
}: AddressesProps) {
  // Translations
  const t = useTranslations(
    'pages.checkout.shipping-addresses',
  );

  // States
  const [selected, setSelected] = useState<string | null>(
    getValues('shippingAddress.street') || null,
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
          {isLoading && <AddressesSkeleton />}

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
                onClick={() => {
                  setSelected(address.street);
                  setValue('shippingAddress', {
                    street: address.street,
                    phone: address.phone,
                    city: address.city,
                    lat: address.lat,
                    long: address.long,
                  });
                }}
                selected={selected === address.street}
              />
            ))
          )}
        </div>

        {/* Add Address */}
        <AddAddress />

        {/* Next Step */}
        <div className="flex">
          <Button
            className="ms-auto flex items-center gap-2.5"
            onClick={() => setStep(2)}
          >
            <span>{t('next')}</span>
            <span className="rtl:rotate-180">
              <MoveRight size={20} />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
