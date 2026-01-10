import About from '@/components/features/about';
import Companies from '@/components/features/companies';
import Gallery from '@/components/features/gallery';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <About />
      <Gallery />
      <Companies />
    </div>
  );
}
