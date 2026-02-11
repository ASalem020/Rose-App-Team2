import { cn } from '@/lib/utils/tailwind-merge';
import Image from 'next/image';
import React from 'react';

type PaymentMethodProps = {
  imgSrc: string;
  title: string;
  description: string;
  selected?: boolean;
};

export default function PaymentMethod({
  imgSrc,
  title,
  description,
  selected,
}: PaymentMethodProps) {
  return (
    <div
      className={cn(
        'method flex cursor-pointer flex-col gap-2.5 rounded-xl border border-zinc-200 p-4 duration-500 hover:bg-zinc-50',
        selected && 'bg-zinc-50',
      )}
    >
      {/* Image */}
      <div className="image-container relative mx-auto size-44 md:size-48">
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="content">
        {/* Title */}
        <h4
          className={cn(
            'title text-center text-xl font-semibold text-zinc-800 md:text-2xl',
            selected && 'text-maroon-600',
          )}
        >
          {title}
        </h4>

        {/* Description */}
        <p className="description text-center text-xs text-zinc-500 md:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
