import { getToken } from '../utils/get-token';

export async function getCartService() {
  const jwt = await getToken();

  const res = await fetch(`${process.env.API_URL}/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.accessToken}`,
    },
  });

  const data = await res.json();
  return data;
}
