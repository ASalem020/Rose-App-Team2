import { Occasion } from '../types/occasion';

export async function getOccasions(): Promise<Occasion[]> {
  const res = await fetch(
    `https://flower.elevateegy.com/api/v1/occasions?limit=4`,
  );
  const data = await res.json();
  return data.occasions;
}
