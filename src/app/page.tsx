import BestSelling from './_component/sections/best-selling';
import MostPopular from './_component/sections/most-popular';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white py-32 dark:bg-black">
      <div className="container mx-auto">
        <BestSelling />
        <MostPopular />
      </div>
    </main>
  );
}
