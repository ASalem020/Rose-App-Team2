'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Translation
  const t = useTranslations('pages.product-details.error');

  // Effects
  useEffect(() => {
    // Log the error to the console for developers
    console.error('Captured Error:', error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-maroon-50 text-maroon-600 dark:bg-maroon-900/20">
          <AlertTriangle size={40} />
        </div>
      </div>

      <div className="mb-8 w-full max-w-2xl overflow-hidden rounded-xl border border-rose-100 bg-rose-50/50 p-6 text-start dark:border-rose-900/30 dark:bg-rose-900/10">
        <h2 className="mb-2 text-sm font-semibold uppercase text-rose-700 dark:text-maroon-400">
          {t('header')}
        </h2>
        <p className="block break-all font-mono text-sm font-medium text-maroon-600 dark:text-maroon-200">
          {error.message || 'An unexpected error occurred.'}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={() => reset()}
          size="lg"
          className="flex items-center gap-2"
        >
          <RefreshCw size={18} />
          {t('try-again')}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.reload()}
        >
          {t('back')}
        </Button>
      </div>
    </div>
  );
}
