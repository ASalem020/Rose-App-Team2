import { CategoriesResponse } from '../types/category';

export async function getCategoriesService(page=1): Promise<CategoriesResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?page=${page}`,
  );
  const data = await res.json();
  return data;
}
