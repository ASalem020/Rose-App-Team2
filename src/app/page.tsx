import SupportSection from "@/components/appsupport/supportSection";
import OccasionsSection from "@/components/cards/cardview";
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
