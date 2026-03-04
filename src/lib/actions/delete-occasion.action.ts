'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Server Action


/**
 * deleteOccasionAction - Delete an existing occasion via DELETE request
 *
 * API Endpoint: DELETE /api/v1/occasions/:occasionId
 * Authentication: Required (Bearer token via getToken)
 *
 * @param occasionId - The ID of the occasion to delete
 * @returns API response or error object
 */
export async function deleteOccasionAction(occasionId: string) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to delete an occasion',
    };
  }

  try {
    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/occasions/${occasionId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt.accessToken}`,
        },
      },
    );

    const payload = await response.json();

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.error || payload.message || 'Failed to delete occasion',
      };
    }

    return payload;
  } catch {
    // Handle network errors
    return {
      error: 'An error occurred while deleting the occasion',
    };
  }
}
