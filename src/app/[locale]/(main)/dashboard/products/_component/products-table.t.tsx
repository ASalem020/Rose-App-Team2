'use client';

import { Product } from '@/lib/types/product';
import ProductRow from './product-row';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type Props = {
  products: Product[];
};

/**
 * Dashboard Products table
 * Uses translations from pages.dashboard-product namespace.
 */
export default function ProductsTable({ products }: Props) {
  const t = useTranslations('pages.dashboard-product');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {t('header')}
        </h2>

        <Link href="/dashboard/products/add-product">
          <Button className="gap-2 bg-red-600 text-white hover:bg-red-700">
            <Plus size={16} />
            {t('add-product')}
          </Button>
        </Link>
      </div>

      {/* Full Width Search */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('search-placeholder')}
          className="h-11 bg-zinc-50 pl-10"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">
                {t('table.name')}
              </th>
              <th className="px-4 py-3 text-left">
                {t('table.price')}
              </th>
              <th className="px-4 py-3 text-left">
                {t('table.stock')}
              </th>
              <th className="px-4 py-3 text-left">
                {t('table.sales')}
              </th>
              <th className="px-4 py-3 text-left">
                {t('table.ratings')}
              </th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <ProductRow
                key={product._id}
                product={product}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
