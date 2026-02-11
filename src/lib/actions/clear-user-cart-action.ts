'use server';

import { getToken } from '@/lib/utils/get-token';

export async function clearUserCartAction() {
  const jwt = await getToken();

  const response = await fetch(
    `${process.env.API_URL}/cart`,
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
