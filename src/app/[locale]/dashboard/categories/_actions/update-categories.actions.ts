'use server';

import { getToken } from '@/lib/utils/get-token';
import { redirect } from 'next/navigation';

export async function updateCategoryAction(
  id: string,
  formData: FormData,
) {
  const jwt = await getToken();

  if (!jwt?.accessToken) {
    redirect('/login');
  }

  const res = await fetch(
    `${process.env.API_URL}/categories/${id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      body: formData,
    },
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect('/login');
    }
  }
  return {
    success: true,
    message: 'Category updateing successfully ',
  };
}
