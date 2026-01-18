
import SupportSection from "@/components/appsupport/support-Sections";
import OccasionsSection from "@/components/cards/card-List";
import { CardDemo } from "@/components/home/hero-section";

export default function Home() {
  return (
    <main className="mx-auto ">
      <CardDemo/>
      <OccasionsSection/>
       <SupportSection/>
    </main>
     
  );
}
