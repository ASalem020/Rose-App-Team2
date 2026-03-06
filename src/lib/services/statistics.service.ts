import { StatisticsResponse } from '@/types/statistics';
import { getToken } from '../utils/get-token';

export async function getAllStatistics(): Promise<StatisticsResponse> {
  const jwt = await getToken();

  const res = await fetch(
    `${process.env.API_URL}/statistics`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      cache: 'no-store',
    },
  );

  const data: StatisticsResponse = await res.json();

  return data;
}
