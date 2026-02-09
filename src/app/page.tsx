import SupportSection from '@/components/appsupport/support-sections';
import OccasionsSection from "@/components/cards/card-List";
import { CardDemo } from "@/components/home/hero-section";
import Testimonials from './[locale]/(main)/_components/testimonials';

export default function Home() {
  return (

    <main className="mx-auto ">
      <Testimonials />
      <CardDemo />
      <OccasionsSection />
      <SupportSection />
    </main>
  );
}
