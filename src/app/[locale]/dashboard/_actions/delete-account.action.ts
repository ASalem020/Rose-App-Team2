'use server';

import { getToken } from '@/lib/utils/get-token';

export async function deleteAccountAction() {
  const token = await getToken();

  if (!token) {
    throw new Error(
      'Unauthorized , please login to can perform this action',
    );
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/auth/deleteMe`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to delete your account');
    }

    const payload: { message: 'success' } =
      await res.json();

    return payload;
  } catch (error) {
    throw new Error(
      (error as Error).message ||
        'An error occurred while deleting your account',
    );
  }
}
