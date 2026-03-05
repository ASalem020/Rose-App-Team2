'use server';

import { getToken } from '@/lib/utils/get-token';

export async function updateCartQuantityAction({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const jwt = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/cart/${productId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      body: JSON.stringify({ quantity }),
    },
  );

  const payload = await response.json();

  return payload;
}
