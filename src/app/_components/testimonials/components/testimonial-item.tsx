import Rating from '@/components/shared/rating';
import { cn } from '@/lib/utils/tailwind-merge';
import Image from 'next/image';

type TestimonialItemPropsType = {
  name: string;
  imgSrc: string;
  rate: number;
  maxRate?: number;
  comment: string;
  date: string;
};

export default function TestimonialItem({
  name,
  imgSrc,
  rate,
  maxRate,
  comment,
  date,
}: TestimonialItemPropsType) {
  return (
    <div className="comment-box relative min-h-60 min-w-[21.4375rem] rounded-3xl bg-white p-5">
      {/* Avatar */}
      <div
        className={cn(
          // Main Styles
          'image relative mx-auto -mt-20 size-24 overflow-hidden rounded-full border-4 border-white',
          // Media Queries
          'md:size-[7.5rem]',
        )}
      >
        <Image
          src={imgSrc}
          alt={`${name} profile photo`}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2UwZTBlMCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI2MwYzBjMCIvPjxwYXRoIGQ9Ik01MCAxNTBRNTAgMTIwIDEwMCAxMjBUMTUwIDE1MCIgZmlsbD0iI2MwYzBjMCIvPjwvc3ZnPg=="
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Name */}
      <p className="mb-3 text-center text-sm font-semibold text-zinc-800 md:text-base">
        {name}
      </p>

      {/* Rating + Comment */}
      <div className="text flex flex-col gap-2 py-6">
        {/* Rating */}
        <Rating
          rate={rate}
          className="mx-auto"
          maxStars={maxRate}
        />

        {/* Comment */}
        <p className="font-medium leading-4 text-zinc-800">
          {comment}
        </p>
      </div>

      {/* Date */}
      <p className="mt-3 text-center text-xs text-zinc-400">
        {date}
      </p>
    </div>
  );
}
