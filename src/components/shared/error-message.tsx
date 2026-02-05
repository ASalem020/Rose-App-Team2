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
        'error-message border-red-300 bg-red-50 p-3 text-center text-sm text-destructive',
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
