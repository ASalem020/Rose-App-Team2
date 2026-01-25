import Testimonials from './_components/testimonials';
import About from './_components/about';
import Companies from './_components/companies';
import Gallery from './_components/gallery';
import BestSelling from '@/app/_component/sections/best-selling';
import MostPopular from '@/app/_component/sections/most-popular';


export default function Home() {
  return (
    <div className="bg-white font-sarabun dark:bg-zinc-800">
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
