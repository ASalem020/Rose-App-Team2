import { cn } from '@/lib/utils/tailwind-merge';
import React from 'react';

type ErrorMessagePropsType = {
  message: string | undefined;
  className?: string;
};

export default function ErrorMessage({
  message = 'Something is wrong !',
  className,
}: ErrorMessagePropsType) {
  return (
    <p
      className={cn(
        // Main Styles
        'error-message text-xs text-red-600',
        // Media Queries
        'md:text-sm',
        // Custom Classes
        className,
      )}
    >
      {message}
    </p>
  );
}
