'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Types


interface UpdateAddressFields {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
}


// Server Action


/**
 * updateAddressAction - Update an existing user address via PATCH request
 *
 * API Endpoint: PATCH /api/v1/addresses/:addressId
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
 * @param addressId - The ID of the address to update
 * @param fields - The updated address fields
 * @returns API response or error object
 */
export async function updateAddressAction(
  addressId: string, 
  fields: UpdateAddressFields
) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to update an address',
    };
  }

  try {
    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/addresses/${addressId}`,
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
        error: payload.error || payload.message || 'Failed to update address',
      };
    }

    return payload;
  } catch {
    // Handle network errors
    return {
      error: 'An error occurred while updating the address',
    };
  }
}
