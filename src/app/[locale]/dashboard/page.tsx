import TopSellingProducts from './_components/top-selling-products';
import LowStockProducts from './_components/low-stock-products';

export default function Dashboard() {
  return (
    <section className="container mx-auto mt-6 grid grid-cols-2 gap-6">
      <TopSellingProducts />
      <LowStockProducts />
    </section>
  );
}
