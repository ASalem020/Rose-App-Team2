'use server';

import { getToken } from '@/lib/utils/get-token';

export async function GetAddresses() {
  try {
    const jwt = await getToken();
    


    const response = await fetch(`${process.env.API_URL}/addresses`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      cache: 'no-store', // Don't cache addresses
    });

    if (!response.ok) {
      console.error('Failed to fetch addresses:', response.status, response.statusText);
      return { error: `Failed to fetch addresses: ${response.statusText}`, data: null };
    }

    const payload = await response.json();
    console.log('Addresses fetched successfully:', payload);
    return { error: null, data: payload };
  } catch (error) {
    console.error('Error in GetAddresses:', error);
    return { error: 'An error occurred while fetching addresses', data: null };
  }
}