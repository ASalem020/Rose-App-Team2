import QueryProvider from './components/query-provider';
import { NextIntlClientProvider } from 'next-intl';

type ProvidersPropsType = {
  children: React.ReactNode;
};

export default function Providers({
  children,
}: ProvidersPropsType) {
  return (
    <QueryProvider>
      <NextIntlClientProvider>
        {children}
      </NextIntlClientProvider>
    </QueryProvider>
  );
}
