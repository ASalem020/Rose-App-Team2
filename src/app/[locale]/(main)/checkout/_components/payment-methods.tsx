'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import PaymentMethod from './payment-method';
import {
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useState } from 'react';
import { CheckoutSchemaType } from '@/lib/types/checkout';

type PaymentMethodsProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setValue: UseFormSetValue<CheckoutSchemaType>;
  getValues: UseFormGetValues<CheckoutSchemaType>;
};

export default function PaymentMethods({
  setStep,
  setValue,
  getValues,
}: PaymentMethodsProps) {
  // Translation
  const t = useTranslations(
    'pages.checkout.payment-methods',
  );

  // States
  const [selected, setSelected] = useState<string | null>(
    getValues('payment-method') || null,
  );

  return (
    <div className="payment-methods">
      {/* Header ( Title & Back ) */}
      <div className="header mb-6 flex items-center gap-4">
        {/* Back */}
        <Button
          onClick={() => setStep(1)}
          className="bg-zinc-100 p-2.5 text-zinc-800 hover:bg-zinc-200 hover:text-zinc-800"
        >
          <ArrowLeft size={20} className="rtl:rotate-180" />
          <span className="text-sm">{t('back')}</span>
        </Button>

        <h3 className="text-2xl font-semibold md:text-3xl">
          {t('title')}
        </h3>
      </div>

      {/* Payment Methods */}
      <div className="content flex flex-col gap-3">
        {/* Methods */}
        <div className="methods-container grid grid-cols-1 gap-4 p-2.5 md:grid-cols-2">
          {/* Cash Method */}
          <PaymentMethod
            title={t('methods.cash.title')}
            description={t('methods.cash.description')}
            onClick={() => {
              setSelected('cash');
              setValue('payment-method', 'cash');
            }}
            selected={selected === 'cash'}
          />

          {/* Credit Card Method */}
          <PaymentMethod
            title={t('methods.credit-card.title')}
            description={t(
              'methods.credit-card.description',
            )}
            onClick={() => {
              setSelected('credit-card');
              setValue('payment-method', 'credit-card');
            }}
            selected={selected === 'credit-card'}
          />
        </div>

        {/* Checkout Button */}
        <div className="flex border-t border-zinc-100 pt-2.5">
          <Button className="ms-auto flex items-center gap-2.5 px-4 py-2.5">
            <span>{t('checkout')}</span>
            <span className="rtl:rotate-180">
              <MoveRight size={20} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
