'use server';

import { getTestimonialsService } from '@/lib/services/testimonials.service';

export async function getTestimonials() {
  return await getTestimonialsService();
}
