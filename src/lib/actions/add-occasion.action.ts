'use server';


// Imports


import { getToken } from '@/lib/utils/get-token';


// Server Action


/**
 * addOccasionAction - Create a new occasion via POST request (multipart/form-data)
 *
 * API Endpoint: POST /api/v1/occasions
 * Authentication: Required (Bearer token via getToken)
 *
 * Accepts FormData directly so it crosses the Next.js Server Action
 * serialization boundary safely (File inside a plain object is NOT allowed,
 * but FormData is a supported built-in).
 *
 * FormData fields:
 * - name: string
 * - image?: File
 *
 * @param formData - FormData built on the client before calling this action
 * @returns API response or error object
 */
export async function addOccasionAction(formData: FormData) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to add an occasion',
    };
  }

  try {
    // Make API request — forward the FormData as-is
    const response = await fetch(
      `${process.env.API_URL}/occasions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt.accessToken}`,
          // NOTE: Do NOT set Content-Type here; fetch sets it automatically
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
