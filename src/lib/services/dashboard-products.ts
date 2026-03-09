import { getToken } from '@/lib/utils/get-token';
import { Product } from '@/lib/types/product';

type ProductsResponse = {
  message: string;
  products: Product[];
  metadata?: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage?: number;
  };
};

/**
 * Fetch all products for dashboard management.
 * This runs on the server to securely attach the access token.
 */
export async function getProductsService(): Promise<ProductsResponse> {
  const jwt = await getToken();

  if (!jwt?.accessToken) {
    throw new Error('Unauthorized');
  }

  const res = await fetch(
    `${process.env.API_URL}/products`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt.accessToken}`,
      },
      cache: 'no-store', // Always get fresh data
    },
  );

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(
      payload?.message || 'Failed to fetch products',
    );
  }

  return payload;
}
