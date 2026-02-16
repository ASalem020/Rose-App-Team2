'use server';

import { getToken } from '../utils/get-token';

export async function addToWishlistAction(
  productId: string,
) {
  const jwt = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/wishlist`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      body: JSON.stringify({ productId }),
    },
  );

  const payload = await response.json();

  return payload;
}
