'use server';

import { getToken } from '@/lib/utils/get-token';

export async function deleteCategoriesActions(id: string) {
  const jwt = await getToken();

  const res = await fetch(
    `${process.env.API_URL}/categories/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
    },
  );

  const data = await res.json();
  return data;
}
