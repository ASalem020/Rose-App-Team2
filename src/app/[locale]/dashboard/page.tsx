import TopSellingProducts from './_components/top-selling-products';
import LowStockProducts from './_components/low-stock-products';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <TopSellingProducts />
      <LowStockProducts />
    </div>
  );
}
