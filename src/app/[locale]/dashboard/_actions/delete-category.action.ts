'use server';

import { getToken } from '@/lib/utils/get-token';
import { DeleteCategorySuccessResponse } from '../_types/category';

export async function deleteCategoryAction(
  categoryId: string,
) {
  const token = await getToken();

  if (!token) {
    throw new Error(
      'Unauthorized , please login to can perform this action',
    );
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/categories/${categoryId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to delete the category');
    }

    const payload: DeleteCategorySuccessResponse =
      await res.json();

    return payload;
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        'An error occurred while deleting the category',
    );
  }
}
