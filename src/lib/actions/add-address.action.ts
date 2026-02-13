'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Types


interface AddAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}


// Server Action


/**
 * addAddressAction - Create a new user address via PATCH request
 *
 * API Endpoint: PATCH /api/v1/addresses
 * Authentication: Required (Bearer token via getToken)
 *
 * Request Body:
 * {
 *   street: string,
 *   phone: string,
 *   city: string,
 *   lat: string,
 *   long: string,
 *   username: string
 * }
 *
 * @param fields - The new address fields
 * @returns API response or error object
 */
export async function addAddressAction(fields: AddAddressFields) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to add an address',
    };
  }

  try {
    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/addresses`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt.accessToken}`,
        },
        body: JSON.stringify(fields),
      },
    );

    const payload = await response.json();

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.error || payload.message || 'Failed to add address',
      };
    }

    return payload;
  } catch {
    // Handle network errors
    return {
      error: 'An error occurred while adding the address',
    };
  }
}
