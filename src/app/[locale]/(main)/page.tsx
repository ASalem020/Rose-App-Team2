import Testimonials from './_components/testimonials';
import About from './_components/about';
import Companies from './_components/companies';
import Gallery from './_components/gallery';

export default function Home() {
  return (
    <div className="bg-white dark:bg-zinc-800">
      <About />
      <Gallery />
      <Testimonials />
      <Companies />
    </div>
  );
}
