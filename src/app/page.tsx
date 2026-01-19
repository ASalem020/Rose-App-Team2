import Testimonials from './_components/testimonials';

import SupportSection from "@/components/appsupport/support-Sections";
import OccasionsSection from "@/components/cards/card-List";
import { CardDemo } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="bg-white font-sarabun dark:bg-zinc-800">
      <Testimonials />
    </div>
    <main className="mx-auto ">
      <CardDemo/>
      <OccasionsSection/>
       <SupportSection/>
    </main>
     
  );
}
