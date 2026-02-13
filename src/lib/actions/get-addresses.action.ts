'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Server Action


/**
 * GetAddresses - Fetch all addresses for the authenticated user
 *
 * API Endpoint: GET /api/v1/addresses
 * Authentication: Required (Bearer token via getToken)
 *
 * @returns Object containing either error message or fetched data
 */
export async function GetAddresses() {
  try {
    // Get token for authentication
    const jwt = await getToken();

    // Make API request with no-store cache to ensure fresh data
    const response = await fetch(`${process.env.API_URL}/addresses`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.accessToken}`,
      },
      cache: 'no-store',
    });

    // Handle API errors
    if (!response.ok) {
      return { 
        error: `Failed to fetch addresses: ${response.statusText}`, 
        data: null 
      };
    }

    const payload = await response.json();
    return { error: null, data: payload };
  } catch (error) {
    // Handle network or unexpected errors
    console.error('Error in GetAddresses:', error);
    return { 
      error: 'An error occurred while fetching addresses', 
      data: null 
    };
  }
}
