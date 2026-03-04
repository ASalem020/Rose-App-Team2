'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Types


interface UpdateOccasionFields {
  name: string;
}


// Server Action


/**
 * updateOccasionAction - Update an existing occasion via PUT request
 *
 * API Endpoint: PUT /api/v1/occasions/:occasionId
 * Authentication: Required (Bearer token via getToken)
 *
 * Request Body (FormData):
 * - name: string
 *
 * @param occasionId - The ID of the occasion to update
 * @param fields - The updated occasion fields
 * @returns API response or error object
 */
export async function updateOccasionAction(
  occasionId: string,
  fields: UpdateOccasionFields,
) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to update an occasion',
    };
  }

  try {
    // Build multipart form data
    const formData = new FormData();
    formData.append('name', fields.name);

    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/occasions/${occasionId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${jwt.accessToken}`,
        },
        body: formData,
      },
    );

    const payload = await response.json();

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.error || payload.message || 'Failed to update occasion',
      };
    }

    return payload;
  } catch {
    // Handle network errors
    return {
      error: 'An error occurred while updating the occasion',
    };
  }
}
