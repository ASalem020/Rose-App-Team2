import { Translations } from '@/lib/types/global';
import React, { useMemo } from 'react';

type TotalProps = {
  subTotalAmount: string | number;
  t: Translations;
  coupons: { coupon: string; percentage: string }[];
};

export default function Total({
  subTotalAmount,
  t,
  coupons = [],
}: TotalProps) {
  // Variables
  const totalPercentages = useMemo(() => {
    return coupons.reduce(
      (acc, coupon) => acc + Number(coupon.percentage),
      0,
    );
  }, [coupons]);

  return (
    <div className="total flex flex-col gap-2.5 p-2.5">
      {/* Sub Total */}
      <div className="sub-total flex items-center justify-between">
        <h5 className="text-base font-medium text-zinc-800 md:text-lg">
          {t('sub-total')}
        </h5>

        <span className="text-lg font-semibold text-zinc-800 md:text-xl">
          {subTotalAmount} EGP
        </span>
      </div>

      {/* Discount */}
      <div className="discount flex items-center gap-2.5">
        {/* Line */}
        <span className="line flex-1 border border-zinc-300"></span>

        <span className="text-lg font-semibold text-zinc-800 md:text-xl">
          {coupons.length === 0
            ? t('no-discount')
            : `${totalPercentages}% ${t('discount')}`}
        </span>

        {/* Line */}
        <span className="line flex-1 border border-zinc-300"></span>
      </div>

      {/* Total */}
      <div className="total flex items-center justify-between text-xl font-bold text-zinc-800 md:text-2xl">
        <h4>{t('total')}</h4>

        <span>
          {coupons.length === 0
            ? subTotalAmount
            : Number(subTotalAmount) -
              (Number(subTotalAmount) * totalPercentages) /
                100}
          EGP
        </span>
      </div>
    </div>
  );
}
