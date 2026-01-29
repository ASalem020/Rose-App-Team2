import { cn } from '@/lib/utils/tailwind-merge';
import React from 'react';

type ErrorMessagePropsType = {
  message: string;
  className?: string;
};

export default function ErrorMessage({
  message,
  className,
}: ErrorMessagePropsType) {
  return (
    <p
      className={cn(
        // Main Styles
        'error-message text-sm text-destructive p-3 border-red-300 bg-red-50 text-center ',
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
