import { Occasion } from '../types/occasion';

// Fetch occasions used in the filter UI
export async function getOccasions(): Promise<Occasion[]> {
  // Request a limited number of occasions to match the UI design
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/occasions?limit=6`,
    {
      // Always fetch fresh data for filters
      cache: 'no-store',
    },
  );

  // Handle failed requests
  if (!res.ok) {
    throw new Error('Failed to fetch occasions');
  }

  // Parse API response
  const data = await res.json();

  // Return only the occasions list
  return data.occasions;
}
