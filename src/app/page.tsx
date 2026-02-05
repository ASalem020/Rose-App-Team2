import Testimonials from './_components/testimonials';
import SupportSection from '@/components/appsupport/support-Sections';
import OccasionsSection from '@/components/cards/card-List';
import { CardDemo } from '@/components/home/hero-section';

export default function Home() {
  return (
    <main className="mx-auto">
      <Testimonials />
      <CardDemo />
      <OccasionsSection />
      <SupportSection />
    </main>
  );
}
