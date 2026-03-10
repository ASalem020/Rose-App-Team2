import { Translations } from '@/lib/types/global';
import { useFormatter } from 'next-intl';
import React, { useMemo } from 'react';

type TotalProps = {
  subTotalAmount: string | number;
  t: Translations;
  coupons: {
    coupon: string;
    discountAmount: string;
    total?: string;
    totalAfterDiscount?: string;
  }[];
};

export default function Total({
  subTotalAmount,
  t,
  coupons = [],
}: TotalProps) {
  // Translations
  const format = useFormatter();

  // Variables
  // const totalPercentages = useMemo(() => {
  //   return coupons.reduce(
  //     (acc, coupon) => acc + Number(coupon.discountAmount),
  //     0,
  //   );
  // }, [coupons]);

  const total = useMemo(() => {
    return coupons.reduce(
      (acc, coupon) => acc + Number(coupon.total),
      0,
    );
  }, [coupons]);

  const totalAfterDiscount = useMemo(() => {
    return coupons.reduce(
      (acc, coupon) =>
        acc + Number(coupon.totalAfterDiscount),
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
          {format.number(
            Number(subTotalAmount),
            'short-price',
          )}
        </span>
      </div>

      {/* Discount */}
      <div className="discount flex items-center gap-2.5">
        {/* Line */}
        <span className="line flex-1 border border-zinc-300"></span>

        <span className="text-lg font-semibold text-zinc-800 md:text-xl">
          {coupons.length === 0
            ? t('no-discount')
            : `${Number(((total - totalAfterDiscount) / total) * 100).toFixed(2)}% ${t('discount')}`}
        </span>

        {/* Line */}
        <span className="line flex-1 border border-zinc-300"></span>
      </div>

      {/* Total */}
      <div className="total flex items-center justify-between text-xl font-bold text-zinc-800 md:text-2xl">
        <h4>{t('total')}</h4>

        <span>
          {coupons.length === 0
            ? format.number(
                Number(subTotalAmount),
                'short-price',
              )
            : format.number(
                Number(totalAfterDiscount),
                'short-price',
              )}
        </span>
      </div>
    </div>
  );
}
