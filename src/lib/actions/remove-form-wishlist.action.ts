'use server';

import { getToken } from '../utils/get-token';

export async function removeFromWishlistAction(
  productId: string,
) {
  const jwt = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/wishlist/${productId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
    },
  );
  const payload = await response.json();

  return payload;
}
