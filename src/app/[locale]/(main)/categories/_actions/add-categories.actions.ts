'use server';
import { getToken } from '@/lib/utils/get-token';

export async function AddCategoryAction(
  formData: FormData,
) {
  const jwt = await getToken();
  if (!jwt?.accessToken) throw new Error('Unauthorized');

  const res = await fetch(
    `${process.env.API_URL}/categories`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt.accessToken}`,
      },
      body: formData,
    },
  );

  const payload = await res.json();
  console.log('payload', payload);

  if (payload.error) {
    const error = await res.json();
    return {
      success: false,
      message: error.error || 'Add failed',
    };
  }

  return {
    success: true,
    message: 'Category added successfully ',
  };
}
