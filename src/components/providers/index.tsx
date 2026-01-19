'use client';

import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import {
  NextIntlClientProvider,
  AbstractIntlMessages,
} from 'next-intl';

interface ProvidersProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}

export function Providers({
  children,
  messages,
  locale,
}: ProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
        >
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
