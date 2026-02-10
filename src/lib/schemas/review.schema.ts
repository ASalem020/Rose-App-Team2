// Imports

import { z } from 'zod';

// Schema

/**
 * addReviewSchema - Validation schema for product reviews
 *
 * Fields:
 * - product: Required product ID
 * - rating: Number between 1 and 5
 * - title: String with minimum 3 characters
 * - comment: String with minimum 10 characters
 */
export const addReviewSchema = z.object({
  product: z.string().min(1, 'Product ID is required'),
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters'),
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters'),
});

// Types

export type AddReviewFormData = z.infer<
  typeof addReviewSchema
>;
