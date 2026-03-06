'use server';


// Imports


import { profileFields } from '@/lib/schemas/profile';
import { getToken } from '@/lib/utils/get-token';


// Actions


/**
 * updateProfileAction - Updates the authenticated user's profile
 *
 * API Endpoint: PUT /auth/editProfile
 * Authentication: Required (Bearer token)
 */
export async function updateProfileAction(data: profileFields) {
  const jwt = await getToken();
  const res = await fetch(`${process.env.API_URL}/auth/editProfile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.accessToken}`,
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    }),
  });
  const payload = await res.json();
  return payload;
}

/**
 * deleteMyAccountAction - Permanently deletes the authenticated user's account
 *
 * API Endpoint: DELETE /auth/deleteMe
 * Authentication: Required (Bearer token)
 */
export async function deleteMyAcountAction() {
  const jwt = await getToken();
  const res = await fetch(`${process.env.API_URL}/auth/deleteMe`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt?.accessToken}`,
    },
  });
  const payload = await res.json();
  return payload;
}
