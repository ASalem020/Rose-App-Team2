// Imports

import { useMutation } from '@tanstack/react-query';
import { addReviewAction } from '@/lib/actions/review.action';
import { AddReviewFormData } from '@/lib/schemas/review.schema';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

// Custom Hook

/**
 * useAddReview - Hook for adding product reviews
 *
 * Features:
 * - Handles API calls via server action
 * - Shows success/error toast notifications with i18n
 * - Manages loading and success states
 *
 * @returns Object with isPending, error, addReview (mutate function), and isSuccess
 */
export const useAddReview = () => {
  const t = useTranslations('pages.products.reviews.addReview');

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
        toast.success(t('success'));
      },
      onError: (error: Error) => {
        // Check for specific error messages and show appropriate translation
        if (error.message === 'You have already reviewed this product') {
          toast.error(t('errorAlreadyReviewed'));
        } else {
          toast.error(t('errorGeneric'));
        }
      },
    });

  return { isPending, error, addReview: mutate, isSuccess };
};
