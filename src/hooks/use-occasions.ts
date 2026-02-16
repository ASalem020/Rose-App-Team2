'use client';

import { useQuery } from '@tanstack/react-query';
import { getOccasions } from '@/lib/services/occasions-card.service';

export function useOccasions() {
  return useQuery({
    queryKey: ['occasions'],
    queryFn: () => getOccasions(),
  });
}
