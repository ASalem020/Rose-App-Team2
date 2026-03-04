'use server';

import { CheckoutSchemaType } from '../types/checkout';
import { getToken } from '../utils/get-token';

export async function checkoutSessionCredit(
  data: CheckoutSchemaType,
) {
  try {
    const { shippingAddress } = data;
    const token = await getToken();

    if (!token?.accessToken) {
      throw new Error('Authentication required');
    }

    const response = await fetch(
      `${process.env.API_URL}/orders/checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify({ shippingAddress }),
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(
        payload.error ||
          'Failed to create checkout session',
      );
    }

    return payload;
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        'An unexpected error occurred. Please try again later.',
    );
  }
}

export async function checkoutSessionCash(
  data: CheckoutSchemaType,
) {
  try {
    const { shippingAddress } = data;
    const token = await getToken();

    if (!token?.accessToken) {
      throw new Error('Authentication required');
    }

    const response = await fetch(
      `${process.env.API_URL}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`,
        },
        body: JSON.stringify({ shippingAddress }),
      },
    );

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(
        payload.error ||
          'Failed to create checkout session',
      );
    }

    return payload;
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        'An unexpected error occurred. Please try again later.',
    );
  }
}
