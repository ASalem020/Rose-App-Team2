'use client';

import { Product } from '@/lib/types/product';
import { useDeleteProduct } from '../_hooks/use-delete-product';
import { toast } from 'sonner';
import Link from 'next/link';
import { Pencil, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  product: Product;
};

/**
 * Single product row
 * Uses translated labels and toast messages.
 */
export default function ProductRow({ product }: Props) {
  const t = useTranslations('pages.dashboard-product');
  const { mutateAsync, isLoading } = useDeleteProduct();

  const handleDelete = async () => {
    try {
      await mutateAsync(product._id);
      toast.success(t('toast.delete-success'));
    } catch {
      toast.error(t('toast.delete-error'));
    }
  };

  const isLowStock = product.quantity <= 5;

  return (
    <tr className="border-t transition hover:bg-zinc-50">
      {/* Name */}
      <td className="px-4 py-3 font-medium">
        {product.title}
      </td>

      {/* Price */}
      <td className="px-4 py-3">{product.price} EGP</td>

      {/* Stock */}
      <td
        className={`px-4 py-3 ${isLowStock ? 'font-medium text-red-600' : ''}`}
      >
        {product.quantity}
      </td>

      {/* Sales */}
      <td className="px-4 py-3">{product.sold}</td>

      {/* Ratings */}
      <td className="px-4 py-3">
        {product.rateAvg}/5 ({product.rateCount})
      </td>

      {/* Actions */}
      <td className="space-x-2 px-4 py-3 text-right">
        <Link
          href={`/dashboard/products/update-product/${product._id}`}
          className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100"
        >
          <Pencil size={14} />
          {t('table.edit')}
        </Link>

        <button
          onClick={handleDelete}
          disabled={isLoading}
          className="inline-flex items-center gap-1 rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
        >
          <Trash size={14} />
          {t('table.delete')}
        </button>
      </td>
    </tr>
  );
}
