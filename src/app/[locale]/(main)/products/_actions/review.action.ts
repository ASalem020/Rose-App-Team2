'use server';

// Imports

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { AddReviewFormData } from '../_validations/review.validation';

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

  // Validate authentication
  if (!session?.accessToken) {
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

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.message || 'Failed to add review',
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
