import TopSellingProducts from './_components/top-selling-products';
import LowStockProducts from './_components/low-stock-products';
import StatsSection from './_components/stats-section';

export default function Dashboard() {
  return (
    <main>
      <StatsSection />
      <section className="container mx-auto mt-6 grid grid-cols-2 gap-6">
        <TopSellingProducts />
        <LowStockProducts />
      </section>
    </main>
  );
}
