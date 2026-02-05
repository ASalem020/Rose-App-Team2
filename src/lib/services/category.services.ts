import { categories } from '../types/category';

export async function getCategories(): Promise<categories[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
  );
  const data = await res.json();
  return data.categories;
}
