'use server';
import { ApplyCouponResponse } from '../types/checkout';
import { getToken } from '../utils/get-token';

export async function applyCoupon(coupon: string) {
  try {
    const token = await getToken();

    const res = await fetch(
      `${process.env.API_URL}/coupons/apply`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.accessToken}`,
        },
        body: JSON.stringify({ code: coupon }),
      },
    );

    const data: ApplyCouponResponse = await res.json();

    if ('error' in data) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred',
    );
  }
}
