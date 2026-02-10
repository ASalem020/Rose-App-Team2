'use server';

// Imports

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { AddReviewFormData } from '../schemas/review.schema';

// Server Action

/**
 * addReviewAction - Server action for adding a product review
 *
 * API Endpoint: POST /api/v1/reviews
 * Authentication: Required (Bearer token from session)
 *
 * @param fields - Review data containing product ID, rating, title, and comment
 * @returns API response payload or error object
 */
export async function addReviewAction(
  fields: AddReviewFormData,
) {
  // Get the current session from NextAuth
  const session = await getServerSession(authOptions);

  console.log('=== Review Action Debug ===');
  console.log('Fields received:', fields);
  console.log('Session:', session);
  console.log('Access Token:', session?.accessToken);

  // Validate authentication
  if (!session?.accessToken) {
    console.log('Auth failed - no access token');
    return {
      error: 'You must be logged in to add a review',
    };
  }

  try {
    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(fields),
      },
    );

    const payload = await response.json();
    console.log(payload)
    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.error,
      };
    }

    return payload;
  } catch {
    // Handle network or unexpected errors
    return {
      error: 'An error occurred while adding the review',
    };
  }
}
