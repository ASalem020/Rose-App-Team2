import About from '@/components/features/about';
import Companies from '@/components/features/companies';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <About />
      <Companies />
    </div>
  );
}
