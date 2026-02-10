'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    addReviewSchema,
    AddReviewFormData,
} from '@/lib/schemas/review.schema';
import { useAddReview } from '../_hooks/use-add-review';
import { cn } from '@/lib/utils/tailwind-merge';
import { useTranslations } from 'next-intl';

// Types
interface AddReviewFormProps {
    productId: string;
}

/**
 * AddReviewForm - Form component for submitting product reviews
 *
 * Features:
 * - Interactive star rating (1-5) with half-star support
 * - Form validation with Zod
 * - Auto-reset after successful submission
 * - Loading states during API calls
 * - Authentication check with overlay
 *
 * @param productId - The ID of the product being reviewed
 */
export default function AddReviewForm({ productId }: AddReviewFormProps) {
    // Translation
    const t = useTranslations('pages.products.reviews.addReview');

    // State
    const { status } = useSession();

    // Mutation
    const { addReview, isPending, isSuccess } = useAddReview();

    // Form & Validation
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
    } = useForm<AddReviewFormData>({
        resolver: zodResolver(addReviewSchema),
        defaultValues: {
            product: productId,
            rating: 0,
            title: '',
            comment: '',
        },
    });

    // Variables
    const isAuthenticated = status === 'authenticated';
    const currentRating = watch('rating');

    // Handlers
    const onSubmit = (data: AddReviewFormData) => {

        // Add product ID to the review data
        const reviewData = {
            ...data,
            product: productId,
        };

        // Add review API call
        addReview(reviewData);
    };

    // Reset form after successful submission
    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    }, [isSuccess, reset]);

    // Render

    return (
        <div className="relative h-full col-span-1 border-l-2 border-zinc-200">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn(
                    'flex h-full flex-col justify-between space-y-4 rounded-lg px-6 dark:bg-zinc-800/50',
                    !isAuthenticated && 'pointer-events-none blur-sm',
                )}
            >
                {/* Rating Input */}
                <div className="flex items-center gap-2">
                    <Label>{t('labelRating')}</Label>
                    {/* Stars */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                className="relative h-6 w-6 transition-transform hover:scale-110"
                            >
                                {/* Left half hit area for .5 increments */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setValue('rating', star - 0.5)}
                                    className="absolute start-0 top-0 z-10 h-full w-1/2 cursor-pointer"
                                    aria-label={`Rate ${star - 0.5} stars`}
                                />

                                {/* Right half hit area for .0 increments */}
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setValue('rating', star)}
                                    className="absolute end-0 top-0 z-10 h-full w-1/2 cursor-pointer"
                                    aria-label={`Rate ${star} stars`}
                                />

                                {/* Visual representation */}
                                <div className="pointer-events-none">
                                    {currentRating >= star ? (
                                        <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                                    ) : currentRating >= star - 0.5 ? (
                                        <div className="relative">
                                            <Star className="h-6 w-6 text-orange-300" />
                                            <StarHalf className="absolute inset-0 h-6 w-6 fill-yellow-400 text-yellow-400 rtl:-scale-x-100" />
                                        </div>
                                    ) : (
                                        <Star className="h-6 w-6 text-orange-300" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {errors.rating && (
                        <p className="text-xs text-red-500">{errors.rating.message}</p>
                    )}
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                    <Label htmlFor="title">{t('labelTitle')}</Label>
                    <Input
                        id="title"
                        {...register('title')}
                        type="text"
                        placeholder={t('placeholderTitle')}
                    />
                    {errors.title && (
                        <p className="text-xs text-red-500">{errors.title.message}</p>
                    )}
                </div>

                {/* Comment Input */}
                <div className="space-y-2">
                    <Label htmlFor="comment">{t('labelComment')}</Label>
                    <Textarea
                        id="comment"
                        {...register('comment')}
                        placeholder={t('placeholderComment')}
                        rows={4}
                    />
                    {errors.comment && (
                        <p className="text-xs text-red-500">{errors.comment.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isPending || !isAuthenticated}
                    className="w-full rounded-lg bg-maroon-600 py-3 font-semibold text-white hover:bg-maroon-700 disabled:opacity-50 dark:bg-pink-500 dark:text-maroon-900 dark:hover:bg-pink-600"
                >
                    {isPending ? t('submitting') : t('submit')}
                </Button>
            </form>

            {/* Authentication Overlay */}
            {!isAuthenticated && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                    <p className="text-center text-lg font-medium text-zinc-700 dark:text-zinc-300">
                        {t('authRequired')}
                    </p>
                </div>
            )}
        </div>
    );
}
