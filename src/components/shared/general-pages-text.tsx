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
      <p className="main-message !font-inter text-center text-2xl font-semibold text-zinc-900 md:text-4xl rtl:font-tajawal">
        {mainMessage}
      </p>

      {/* Sub Message */}
      <p
        className={cn(
          'sub-message !font-inter mb-5 text-center text-sm text-zinc-400 md:text-xl rtl:font-tajawal',
          subMessageClassName,
        )}
      >
        {subMessage}
      </p>
    </>
  );
}
