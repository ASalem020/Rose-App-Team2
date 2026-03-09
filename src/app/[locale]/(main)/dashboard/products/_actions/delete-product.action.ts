'use server';

import { getToken } from '@/lib/utils/get-token';
import { revalidatePath } from 'next/cache';

/**
 * Deletes a product by ID.
 * This runs on the server to keep the token secure.
 */
export async function deleteProductAction(id: string) {
  const jwt = await getToken();

  if (!jwt?.accessToken) {
    throw new Error('Unauthorized');
  }

  const res = await fetch(
    `${process.env.API_URL}/products/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt.accessToken}`,
      },
    },
  );

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(
      payload.message || 'Failed to delete product',
    );
  }

  // Revalidate dashboard products page
  revalidatePath('/dashboard/products');

  return payload;
}
