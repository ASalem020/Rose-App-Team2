import { getOccasions } from '@/lib/services/occasions.service';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function useAllOccasions() {
  const [activeOccasion, setActiveOccasion] = useState<
    string | null
  >(null);

  // ^ 1 Get occasions
  const { data: occasions } = useQuery({
    queryKey: ['occasions'],
    queryFn: getOccasions,
  });
  if (occasions?.length && !activeOccasion) {
    setActiveOccasion(occasions[0]._id);
  }

  return {
    activeOccasion,
    setActiveOccasion,
    occasions,
  };
}
