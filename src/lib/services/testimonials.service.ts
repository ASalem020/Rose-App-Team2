import { TestimonialsAPIResponse } from '../types/testimonials';

export async function getTestimonialsService() {
  const res = await fetch('/api/testimonials');

  const payload: TestimonialsAPIResponse = await res.json();

  return payload;
}
