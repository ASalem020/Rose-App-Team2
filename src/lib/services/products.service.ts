import { Product } from '../types/product';

interface ProductFilter {
  limit?: number;
  sort?: string;
  occasionsId?: string | null;
}

export async function getAllProduct({
  limit,
  sort,
  occasionsId,
}: ProductFilter): Promise<Product[]> {
  const res = await fetch(
    `https://flower.elevateegy.com/api/v1/products?${limit ? `limit=${limit}` : ''}${sort ? `&sort=${sort}` : ''}${occasionsId ? `&occasions=${occasionsId}` : ''}`,
    {
      cache: 'no-store',
    },
  );
  const data = await res.json();
  return data.products;
}
