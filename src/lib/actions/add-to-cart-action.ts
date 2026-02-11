'use server';

import { getToken } from '@/lib/utils/get-token';
import { Product } from '../types/product';

export async function addToCartAction({
  product,
  quantity,
}: {
  product: Product;
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
      body: JSON.stringify({
        product: product._id,
        quantity: quantity,
      }),
    },
  );

  const payload = await response.json();

  return payload;
}
