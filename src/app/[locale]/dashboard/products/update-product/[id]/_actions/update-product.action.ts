'use server';

import { UpdateProductFields } from '@/app/[locale]/(auth)/register/_types/product-fields';
import { redirect } from '@/i18n/navigation';
import { getToken } from '@/lib/utils/get-token';
import { getLocale } from 'next-intl/server';

export async function updateProductAction(
  id: string,
  values: UpdateProductFields,
) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to add a product',
    };
  }

  const locale = await getLocale();

  const res = await fetch(
    `${process.env.API_URL}/products/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.accessToken}`,
      },
      body: JSON.stringify(values),
    },
  );

  const payload = await res.json();

  if ('error' in payload) {
    throw new Error(
      payload.error ||
        payload.message ||
        'Failed to add product, try again later!',
    );
  }

  redirect({ href: '/dashboard/products', locale });
}
