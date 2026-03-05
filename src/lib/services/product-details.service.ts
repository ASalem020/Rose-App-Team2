import { Product } from '../types/product';

export async function getProductDetailsService(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
  );

  const data: { product: Product } = await res.json();
  return data.product;
}
