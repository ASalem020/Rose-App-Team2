import { cn } from '@/lib/utils/tailwind-merge';
import React from 'react';

type SectionHeaderDescriptionPropsType = {
  description: string;
};

export default function SectionHeaderDescription({
  description,
}: SectionHeaderDescriptionPropsType) {
  return (
    <p
      className={cn(
        // Main Styles
        'relative w-fit text-start text-2xl font-bold text-maroon-700 md:mx-auto md:text-center md:text-3xl lg:text-4xl',
        // Before Styles
        'before:absolute before:left-0 before:top-3/4 before:z-0 before:h-4 before:w-3/4 before:rounded-r-2xl before:bg-softPink-100',
        // After Styles
        'after:absolute after:-bottom-[0.375rem] after:left-0 after:z-0 after:h-[0.125rem] after:w-40 after:bg-softPink-600',
      )}
    >
      <span className="relative z-10">{description}</span>
    </p>
  );
}
