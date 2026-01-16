import ToggleLang from '@/components/shared/toggle-lang';

import Testimonials from '../_components/testimonials';
import About from '@/app/_components/about';
import Companies from '@/app/_components/companies';
import Gallery from '@/app/_components/gallery';

export default function Home() {
  return (
    <div className="bg-white font-sarabun dark:bg-zinc-800">
      <div className="my-5 flex items-center justify-center">
        <ToggleLang />
      </div>
      <Testimonials />
      <About />
      <Gallery />
      <Companies />
    </div>
  );
}
