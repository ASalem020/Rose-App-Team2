// Imports

import { useMutation } from '@tanstack/react-query';
import { addReviewAction } from '@/app/[locale]/(main)/products/_actions/review.action';
import { AddReviewFormData } from '@/app/[locale]/(main)/products/_validations/review.validation';
import { toast } from 'sonner';

// Custom Hook

/**
 * useAddReview - Hook for adding product reviews
 *
 * Features:
 * - Handles API calls via server action
 * - Shows success/error toast notifications
 * - Manages loading and success states
 *
 * @returns Object with isPending, error, addReview (mutate function), and isSuccess
 */
export const useAddReview = () => {
  const { isPending, error, mutate, isSuccess } =
    useMutation({
      mutationFn: async (fields: AddReviewFormData) => {
        // Call server action
        const payload = await addReviewAction(fields);

        // Handle errors from server action
        if ('error' in payload) {
          throw new Error(payload.error);
        }

        return payload;
      },
      onSuccess: () => {
        // Show success message
        toast.success('Review added successfully!');
      },
      onError: (error: Error) => {
        // Show error message
        toast.error(
          error.message || 'Failed to add review',
        );
      },
    });

  return { isPending, error, addReview: mutate, isSuccess };
};
