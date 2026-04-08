'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Actions


/**
 * changePasswordAction - Changes the authenticated user's password
 *
 * API Endpoint: PATCH /auth/change-password
 * Authentication: Required (Bearer token)
 *
 * Note: On success the caller must sign the user out,
 * since the old token is invalidated by the API.
 */
export async function changePasswordAction(data: {
  password: string;
  newPassword: string;
}) {
  const jwt = await getToken();
  const res = await fetch(`${process.env.API_URL}/auth/change-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.accessToken}`,
    },
    body: JSON.stringify({
      password: data.password,
      newPassword: data.newPassword,
    }),
  });
  const payload = await res.json();
  return payload;
}
