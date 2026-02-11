import { useQuery } from "@tanstack/react-query";
import { UserInfoResponse } from '@/lib/types/profile';

export function useProfileInfo() {
    // Hooks
    const {data:userInfo } = useQuery<UserInfoResponse>({
        queryKey: ['profile-info'],
        queryFn: async () => {  
            const res = await fetch('/api/user-info');
            if (!res.ok) {
                throw new Error('Failed to fetch profile info');
            }
            const payload = await res.json() ;
            return payload;
        }
    });
    return {
        userInfo,
    };
}