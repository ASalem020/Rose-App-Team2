'use client';

// Imports

import Rating from '@/components/shared/rating';
import { useGetReviews } from '../_hooks/use-get-reviews';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// Types

interface Review {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        photo?: string;
    };
    rating: number;
    title: string;
    comment: string;
    createdAt: string;
}

// Component

/**
 * ReviewsList - Component for displaying a list of product reviews
 *
 * Features:
 * - Fetches reviews based on productId from search params
 * - Displays user info (name, photo/initials)
 * - Displays rating, title, and comment
 * - Handles loading and empty states
 */
export default function ReviewsList() {
    // Translation

    const t = useTranslations('pages.products.reviews');

    // Navigation

    const searchParams = useSearchParams();

    // Query

    const productId = searchParams.get('id') || '673e2e1f1159920171828153';
    const { data, isLoading, error } = useGetReviews(productId);

    // Variables

    const reviews = data?.reviews;

    // Render

    if (isLoading)
        return <div className="col-span-2 py-10 text-center">{t('loading')}</div>;

    if (error)
        return (
            <div className="col-span-2 py-10 text-center text-red-500">
                {t('error')}
            </div>
        );

    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        return (
            <div className="col-span-2 py-10 text-center text-zinc-500">{t('empty')}</div>
        );
    }

    return (
        <div className="col-span-2 max-h-96 space-y-6 overflow-y-auto pr-2">
            {reviews.map((review: Review) => (
                <div
                    key={review._id}
                    className="space-y-3 border-b border-zinc-100 pb-6 last:border-0 dark:border-zinc-800"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-maroon-600 text-white dark:bg-pink-500 dark:text-maroon-900">
                                {review.user.photo ? (
                                    <Image
                                        src={review.user.photo}
                                        alt={`${review.user.firstName} ${review.user.lastName}`}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-sm font-bold">{review.user.firstName[0]}</span>
                                )}
                            </div>
                            <div>
                                <p className="font-semibold text-maroon-700 dark:text-pink-200">
                                    {review.user.firstName} {review.user.lastName}
                                </p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Rating rate={review.rating} />
                            <span className="text-sm font-semibold text-maroon-700 dark:text-pink-300">
                                ({review.rating})
                            </span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-maroon-700 dark:text-pink-200">
                            {review.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                            {review.comment}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
