'use server';

import { getToken } from '@/lib/utils/get-token';

export async function addToCartAction(id: string) {
  const jwt = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/cart`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      body: JSON.stringify({ product: id, quantity: 1 }),
    },
  );

  const payload = await response.json();

  return payload;
}
