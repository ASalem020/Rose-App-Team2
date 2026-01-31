import Testimonials from './_components/testimonials';
import About from './_components/about';
import Companies from './_components/companies';
import Gallery from './_components/gallery';
import BestSelling from '@/app/[locale]/(main)/_components/sections/best-selling';
import MostPopular from '@/app/[locale]/(main)/_components/sections/most-popular';


export default function Home() {
  return (
    <div className="bg-white dark:bg-zinc-800">
      <div className="my-5 flex items-center justify-center"></div>
      <BestSelling />
      <MostPopular />
      <About />
      <Gallery />
      <Testimonials />
      <Companies />
    </div>
  );
}
