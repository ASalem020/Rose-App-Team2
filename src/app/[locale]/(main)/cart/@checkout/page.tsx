import React from 'react';
import PriceSummary from '../checkout/_components/price-summary';
import CheckoutBtn from './_components/checkout-btn';

export default function Page() {
  return (
    <div className="h-2/4">
      <PriceSummary />
      <CheckoutBtn />
    </div>
  );
}
