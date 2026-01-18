import { Toaster } from '@/components/ui/sonner';
import QueryProvider from './components/query-provider';
import ThemeProvider from './components/theme-provider';

type ProvidersPropsType = {
  children: React.ReactNode;
};

export default function Providers({
  children,
}: ProvidersPropsType) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
}
