'use server';


// Server Action


/**
 * getOccasionAction - Fetch a single occasion by ID
 *
 * API Endpoint: GET /api/v1/occasions/:occasionId
 * Authentication: Not required
 *
 * @param occasionId - The ID of the occasion to fetch
 * @returns The occasion data or an error object
 */
export async function getOccasionAction(occasionId: string) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/occasions/${occasionId}`,
      { cache: 'no-store' },
    );

    const payload = await response.json();

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.error || payload.message || 'Failed to fetch occasion',
      };
    }

    // Normalise: API may return { occasion: {...} } or the object directly
    return payload.occasion ?? payload;
  } catch {
    // Handle network errors
    return {
      error: 'An error occurred while fetching the occasion',
    };
  }
}
