import { TestimonialsAPIResponse } from '../types/testimonials';

export async function getTestimonialsService() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/testimonials`,
  );

  const payload: TestimonialsAPIResponse = await res.json();

  return payload;
}
