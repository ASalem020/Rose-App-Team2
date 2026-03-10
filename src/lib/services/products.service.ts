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
    `${process.env.NEXT_PUBLIC_API_URL}/products?${limit ? `limit=${limit}` : ''}${sort ? `&sort=${sort}` : ''}${occasionsId ? `&occasions=${occasionsId}` : ''}`,
    {
      cache: 'no-store',
    },
  );
  const data = await res.json();
  return data.products;
}
export async function getRelatedProductsService(
  productId: string,
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/related/category/${productId}`,
  );
  const data = await res.json();
  return data;
}
