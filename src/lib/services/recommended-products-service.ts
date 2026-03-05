import { getToken } from '../utils/get-token';

// Get Products You may like
export async function getRecommendedProductsService(
  userId: string,
) {
  const jwt = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/related/recommendations/${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
    },
  );
  const data = await res.json();
  return data;
}
