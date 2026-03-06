// Imports


import { useQuery } from '@tanstack/react-query';
import { UserInfoResponse } from '@/lib/types/profile';


// Custom Hook


/**
 * useProfileInfo - Fetches the current user's full profile data
 *
 * Features:
 * - Fetches from the /api/user-info route
 * - Cached via React Query (queryKey: ['profile-info'])
 *
 * @returns userInfo object containing the user's profile data
 */
export function useProfileInfo() {
  const { data: userInfo } = useQuery<UserInfoResponse>({
    queryKey: ['profile-info'],
    queryFn: async () => {
      const res = await fetch('/api/user-info');
      if (!res.ok) {
        throw new Error('Failed to fetch profile info');
      }
      const payload = await res.json();
      return payload;
    },
  });

  return { userInfo };
}
