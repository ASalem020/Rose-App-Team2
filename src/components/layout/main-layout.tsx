import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="font-sarabun rtl:font-tajawal">
        {children}
      </main>
      <Footer />
    </>
  );
}
