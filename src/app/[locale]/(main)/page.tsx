import Testimonials from './_components/testimonials';
import About from './_components/about';
import Companies from './_components/companies';
import Gallery from './_components/gallery';
import BestSelling from '@/app/[locale]/(main)/_components/sections/best-selling';
import MostPopular from '@/app/[locale]/(main)/_components/sections/most-popular';
import OccasionsSection from '@/components/cards/card-List';
import SupportSection from '@/components/appsupport/support-sections';
import { AddAddressButton } from '@/components/features/address/add-address-button';

export default function Home() {
  return (
    <div className="bg-white dark:bg-zinc-800">
      <div className="container mx-auto py-8 flex justify-center">
        <AddAddressButton />
      </div>
      <OccasionsSection />
      <SupportSection />
      <BestSelling />
      <MostPopular />
      <About />
      <Gallery />
      <Testimonials />
      <Companies />
    </div>
  );
}
