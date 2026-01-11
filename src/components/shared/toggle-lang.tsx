'use client';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import React from 'react';

// TODO: The design is incompatible with the design system because I wait a team member code.
export default function ToggleLang() {
  // Translation
  const locale = useLocale();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions
  const toggleLang = () => {
    router.push(`${pathname}${location.search}`, {
      locale: locale === 'en' ? 'ar' : 'en',
    });
  };

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 rounded-full border-2 border-maroon-600/60 bg-white px-4 py-2 text-sm font-semibold text-maroon-600 shadow-sm transition-colors duration-200 hover:bg-maroon-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-maroon-600 focus:ring-offset-2 dark:bg-zinc-900 dark:text-white"
      aria-label="Toggle language"
    >
      <span className="inline-block">
        {locale === 'en' ? 'العربية' : 'English'}
      </span>
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M2 12h20"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 2a15.3 15.3 0 0 1 0 20a15.3 15.3 0 0 1 0-20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </button>
  );
}
