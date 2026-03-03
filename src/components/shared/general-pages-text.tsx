import { cn } from '@/lib/utils/tailwind-merge';
import React from 'react';

type GeneralPagesTextProps = {
  mainMessage: string;
  subMessage: string;
  subMessageClassName?: string;
};

export default function GeneralPagesText({
  mainMessage,
  subMessage,
  subMessageClassName,
}: GeneralPagesTextProps) {
  return (
    <>
      {/* Main Message */}
      <p className="main-message text-center text-lg font-medium text-zinc-900 md:text-2xl rtl:font-tajawal">
        {mainMessage}
      </p>

      {/* Sub Message */}
      <p
        className={cn(
          'sub-message mb-5 text-center text-sm text-zinc-400 md:text-xl rtl:font-tajawal',
          subMessageClassName,
        )}
      >
        {subMessage}
      </p>
    </>
  );
}
