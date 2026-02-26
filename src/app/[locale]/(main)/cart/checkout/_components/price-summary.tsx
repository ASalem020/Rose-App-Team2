'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ApplyCoupon from './apply-coupon';
import AppliedCoupons from './applied-coupons';
import Total from './total';
import { useGetCart } from '../../_hooks/use-get-cart';

import { useSession } from 'next-auth/react';
import PriceSummarySkeleton from '@/components/skeleton/price-summary-skeleton';

export default function PriceSummary() {
  // session
  const { status } = useSession();

  // Translation
  const t = useTranslations('pages.checkout.price-summary');

  // State
  const [coupons, setCoupons] = useState<
    { coupon: string; percentage: string }[]
  >([]);

  // variables
  const isLoggedIn = status === 'authenticated';

  // query
  const { data, isPending } = useGetCart({
    enabled: isLoggedIn,
  });

  if (isPending) return <PriceSummarySkeleton />;

  return (
    <div className="priceSummary">
      {/* Title */}
      <h3 className="mb-6 text-2xl font-semibold md:text-3xl">
        {t('title')}
      </h3>

      {/* Total & Coupons */}
      <div className="total-coupons flex flex-col gap-2.5 rounded-md bg-zinc-50 p-4">
        {/* Apply Coupon */}
        <ApplyCoupon setCoupon={setCoupons} />

        {/* Applied Coupons */}
        <AppliedCoupons
          noCouponsText={t('no-coupons')}
          coupons={coupons}
          removeText={t('remove-coupon')}
          setCoupons={setCoupons}
        />

        {/* Total */}
        <Total
          t={t}
          subTotalAmount={data?.cart?.totalPrice}
          coupons={coupons}
        />
      </div>
    </div>
  );
}
