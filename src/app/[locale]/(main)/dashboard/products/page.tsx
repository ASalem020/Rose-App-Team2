import { getProductsService } from '@/lib/services/dashboard-products';
import ProductsTable from './_component/products-table.t';

/**
 * Products dashboard page.
 * Fetches products and renders management table.
 */
export default async function ProductsPage() {
  const data = await getProductsService();

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Products</h2>
      <ProductsTable products={data.products} />
    </div>
  );
}
