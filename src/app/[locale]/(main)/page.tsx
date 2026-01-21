import Testimonials from './_components/testimonials';
import About from './_components/about';
import Companies from './_components/companies';
import Gallery from './_components/gallery';

export default function Home() {
  return (
    <div className="bg-white dark:bg-zinc-800">
      <div className="my-5 flex items-center justify-center"></div>
      <About />
      <Gallery />
      <Testimonials />
      <Companies />
    </div>
  );
}
