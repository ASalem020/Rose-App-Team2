import { Occasion } from '../types/occasion';

export async function getOccasions(limit?: string): Promise<Occasion[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/occasions${limit ? `?limit=${limit}` : ''}`,
  );
  const data = await res.json();
  return data.occasions;
}
