import { cn } from '@/lib/utils/tailwind-merge';
import React from 'react';

type AppliedCouponsProps = {
  coupons: { coupon: string; percentage: string }[];
  setCoupons: React.Dispatch<
    React.SetStateAction<
      { coupon: string; percentage: string }[]
    >
  >;
  removeText: string;
  noCouponsText: string;
};

export default function AppliedCoupons({
  coupons,
  removeText,
  setCoupons,
  noCouponsText,
}: AppliedCouponsProps) {
  return (
    <div
      className={cn(
        'applied-coupons flex gap-2.5 rounded-lg border border-zinc-300 p-2.5',
        coupons.length === 0
          ? 'min-h-60 items-center justify-center'
          : 'min-h-0 flex-col',
      )}
    >
      {coupons.length === 0 ? (
        <p className="text-center text-sm italic text-zinc-400 md:text-base">
          {noCouponsText}
        </p>
      ) : (
        coupons.map((coupon, index) => (
          <div
            key={index}
            className="coupon flex items-center justify-between gap-2.5 rounded-md bg-zinc-100 p-2.5"
          >
            <span className="text-sm font-medium">
              {coupon.coupon}
            </span>
            <button
              onClick={() =>
                setCoupons(prev =>
                  prev.filter(c => c !== coupon),
                )
              }
              className="text-sm font-medium text-red-500"
            >
              {removeText}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
