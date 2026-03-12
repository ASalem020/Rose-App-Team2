'use client';

import {
  Button,
  buttonVariants,
} from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/tailwind-merge';
import { Pencil, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import useCategories from '../_hooks/use-categories';
import DeleteCategoryButton from './delete-button';
import { useTranslations } from 'next-intl';

export default function CategoryTable() {
  // Transilation
  const t = useTranslations('dashboard.categories');

  // state
  const [search, setSearch] = useState('');

  // hooks
  const { categories } = useCategories();

  // Variable
  const filtered = categories.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ──  Header ── */}
      <div className="mb-2 mt-3 flex flex-wrap items-center justify-between gap-4">
        {/* title */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t('title')}
        </h1>

        {/* add category */}
        <Button
          asChild
          variant="default"
          className="gap-2 bg-maroon-600 text-white hover:bg-maroon-700"
        >
          <Link href="/dashboard/categories/add-new-categories">
            <Plus className="h-4 w-4" />
            {t('add-new-category')}
          </Link>
        </Button>
      </div>

      {/* ── Search ── */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          //  id={`search-${name.toLowerCase()}`}
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* table */}
      <Table className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* header */}
        <TableHeader className="bg-zinc-50">
          <TableRow className="*:text-zinc-900">
            <TableHead className="">{t('name')}</TableHead>
            <TableHead className="pr-36">
              {t('products')}
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {/* body */}
        <TableBody>
          {filtered.map(category => (
            <TableRow
              key={category._id}
              className="hover:bg-maroon-50"
            >
              <TableCell className="font-medium">
                {category.name}
              </TableCell>
              <TableCell>
                {category.productsCount} {t('product')}
              </TableCell>

              {/* buttons  */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* link edit */}
                  <Link
                    href={`categories/${category._id}?name=${category.name}&image=${category.image}`}
                    className={cn(
                      buttonVariants({
                        variant: 'outline',
                        size: 'sm',
                      }),
                      'gap-1.5 border-blue-50 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700',
                    )}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    {t('edit')}
                  </Link>

                  {/* delete component */}
                  <DeleteCategoryButton id={category._id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
