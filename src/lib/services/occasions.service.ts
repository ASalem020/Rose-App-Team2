import { Occasion } from '../types/occasion';

export async function getOccasions(): Promise<Occasion[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URLs}/occasions?limit=4`,
  );
  const data = await res.json();
  return data.occasions;
}
