'use client';

import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import {
  NextIntlClientProvider,
  AbstractIntlMessages,
  Locale,
} from 'next-intl';
import NextAuthProvider from './next-auth.provider';
import AuthSideEffects from '../shared/auth-side-effects';
import { getFormats } from '@/i18n/formats';

interface ProvidersProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: Locale;
}

export function Providers({
  children,
  messages,
  locale,
}: ProvidersProps) {
  // Translations
  const formats = getFormats(locale);

  return (
    <QueryProvider>
      <NextAuthProvider>
        <AuthSideEffects />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider
            messages={messages}
            locale={locale}
            formats={formats}
          >
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </NextAuthProvider>
    </QueryProvider>
  );
}
