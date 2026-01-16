import ToggleLang from '@/components/shared/toggle-lang';
import Testimonials from '../_components/testimonials';

export default function Home() {
  return (
    <div className="bg-white font-sarabun dark:bg-zinc-800">
      <div className="my-5 flex items-center justify-center">
        <ToggleLang />
      </div>
      <Testimonials />
    </div>
  );
}
