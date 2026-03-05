'use server';

import { getToken } from '@/lib/utils/get-token';
import { DeleteProductSuccessResponse } from '../_types/product';

export async function deleteProductAction(
  productId: string,
) {
  const token = await getToken();

  if (!token) {
    throw new Error(
      'Unauthorized , please login to can perform this action',
    );
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to delete the product');
    }

    const payload: DeleteProductSuccessResponse =
      await res.json();

    return payload;
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        'An error occurred while deleting the product',
    );
  }
}
