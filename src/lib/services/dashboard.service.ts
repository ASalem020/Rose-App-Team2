'use server';

import { getToken } from '@/lib/utils/get-token';
import { DashboardResponse } from '@/lib/types/dashboard';

export async function getDashboardStatistics(): Promise<DashboardResponse> {
  const jwt = await getToken();

  if (!jwt?.accessToken) {
    throw new Error('Unauthorized');
  }

  const response = await fetch(
    `${process.env.API_URL}/statistics`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.accessToken}`,
      },
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch dashboard statistics');
  }

  return response.json();
}
