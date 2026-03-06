'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * /dashboard/account — redirects to /dashboard/account/profile
 */
export default function DashboardAccountPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/account/profile');
  }, [router]);

  return null;
}
