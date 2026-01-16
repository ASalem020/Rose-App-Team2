import QueryProvider from './components/query-provider';
import { NextIntlClientProvider } from 'next-intl';
import ThemeProvider from './components/theme-provider';

type ProvidersPropsType = {
  children: React.ReactNode;
};

export default function Providers({
  children,
}: ProvidersPropsType) {
  return (
    <QueryProvider>
      <NextIntlClientProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    </QueryProvider>
  );
}
