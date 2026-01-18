import { getTestimonialsService } from '@/lib/services/testimonials.service';
import { useQuery } from '@tanstack/react-query';

export default function useTestimonials() {
  const {
    data,
    error,
    isFetching: isLoading,
  } = useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonialsService,
  });

  return { data, error, isLoading };
}
