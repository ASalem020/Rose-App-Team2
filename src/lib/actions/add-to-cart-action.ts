'use server';

import { getToken } from '@/lib/utils/get-token';

export async function addToCartAction({
  product,
  quantity,
}: {
  product: string;
  quantity: number;
}) {
  const jwt = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/cart`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      body: JSON.stringify({ product, quantity }),
    },
  );

  const payload = await response.json();

  return payload;
}
