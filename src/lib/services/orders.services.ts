'use server';

import { getToken } from '@/lib/utils/get-token';

/**
 * getUserOrdersAction
 *
 */
export async function getUserOrdersAction() {
  /*
   * Retrieve the JWT from cookies using a server-side helper.
   */
  const jwt = await getToken();

  /**
   * If no access token exists,
   * the user is not authenticated or the session is invalid.
   */
  if (!jwt?.accessToken) {
    return { error: 'Unauthorized. Please login again.' };
  }

  try {
    /**
     * Step 2:
     * Call the protected Orders endpoint.
     * The JWT is sent in the Authorization header.
     */
    const response = await fetch(
      `${process.env.API_URL}/orders`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt.accessToken}`,
        },

        /**
         * Disable caching to ensure fresh data
         */
        cache: 'no-store',
      },
    );

    /**
     * Parse the API response.
     */
    const data = await response.json();

    /**
     * return a structured error object.
     */
    if (!response.ok) {
      return {
        error:
          data?.error || 'Failed to fetch user orders.',
      };
    }

    /**
    
     * Return the full API response.
     */
    return data;
  } catch (error) {
    /**
     * Catch unexpected server/network errors.
     */
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Unexpected server error occurred.',
    };
  }
}
