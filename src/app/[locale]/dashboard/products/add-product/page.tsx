import React from 'react';
import CreateProductForm from './_components/create-product-form';
import { useTranslations } from 'next-intl';

export default function AddProduct() {
  const t = useTranslations(
    'pages.dashboard.products.add-product',
  );

  return (
    <div className="flex flex-row bg-zinc-50">
      <div className="w-1/5 bg-white">Sidebar</div>

      <div className="w-4/5 bg-zinc-100 p-6">
        <h2 className="mb-6 text-2xl font-semibold text-zinc-800">
          {t('header')}
        </h2>

        <div className="mb-20 rounded-2xl bg-white">
          <CreateProductForm />
        </div>
      </div>
    </div>
  );
}
