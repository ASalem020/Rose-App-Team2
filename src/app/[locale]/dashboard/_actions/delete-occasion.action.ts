'use server';

import { getToken } from '@/lib/utils/get-token';
import { DeleteOccasionSuccessResponse } from '../_types/occasion';

export async function deleteOccasionAction(
  occasionId: string,
) {
  const token = await getToken();

  if (!token) {
    throw new Error(
      'Unauthorized , please login to can perform this action',
    );
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/occasions/${occasionId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to delete the occasion');
    }

    const payload: DeleteOccasionSuccessResponse =
      await res.json();

    return payload;
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        'An error occurred while deleting the occasion',
    );
  }
}
