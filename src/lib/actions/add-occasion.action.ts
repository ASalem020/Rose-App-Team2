'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Types


interface AddOccasionFields {
  name: string;
  image?: File;
}


// Server Action


/**
 * addOccasionAction - Create a new occasion via POST request (multipart/form-data)
 *
 * API Endpoint: POST /api/v1/occasions
 * Authentication: Required (Bearer token via getToken)
 *
 * Request Body (FormData):
 * - name: string
 * - image?: File
 *
 * @param fields - The new occasion fields
 * @returns API response or error object
 */
export async function addOccasionAction(fields: AddOccasionFields) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to add an occasion',
    };
  }

  try {
    // Build multipart form data
    const formData = new FormData();
    formData.append('name', fields.name);
    if (fields.image) {
      formData.append('image', fields.image);
    }

    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/occasions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.accessToken}`,
          // NOTE: Do NOT set Content-Type here; the browser sets it automatically
          // with the correct multipart boundary when using FormData.
        },
        body: formData,
      },
    );

    const payload = await response.json();

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.error || payload.message || 'Failed to add occasion',
      };
    }

    return payload;
  } catch {
    // Handle network errors
    return {
      error: 'An error occurred while adding the occasion',
    };
  }
}
