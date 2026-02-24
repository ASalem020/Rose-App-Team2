'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Server Action


/**
 * deleteAddressAction - Delete an existing user address via DELETE request
 *
 * API Endpoint: DELETE /api/v1/addresses/:addressId
 * Authentication: Required (Bearer token via getToken)
 *
 * @param addressId - The ID of the address to delete
 * @returns API response or error object
 */
export async function deleteAddressAction(addressId: string) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to delete an address',
    };
  }

  try {
    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/addresses/${addressId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt.accessToken}`,
        },
      }
    );

    const payload = await response.json();

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.error || payload.message || 'Failed to delete address',
      };
    }

    return payload;
  } catch (error) {
    // Handle network errors
    console.error('Error in deleteAddressAction:', error);
    return {
      error: 'An error occurred while deleting the address',
    };
  }
}
