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
import CategoriesTableSkeleton from './_skeleton/catrgories-table-skeleton';
import DeleteCategoryButton from './delete-button';

// "metadata": {
//     "currentPage": 1,
//     "limit": 10,
//     "totalPages": 3,
//     "totalItems": 27
// },

export default function CategoryTable() {
  // ^ state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // ^ hooks
  const { categories, metadata, isLoading } =
    useCategories(page);

  const filtered = categories.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = metadata?.totalPages ?? 1;

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  );


  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          All Categories
        </h1>

        <Link
          href={'/categories/add-new-categories'}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'gap-2 bg-maroon-600 text-white hover:bg-maroon-700',
          )}
        >
          <Plus className="h-4 w-4" />
          Add a new Categories
        </Link>
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

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>name</TableHead>
              <TableHead>product</TableHead>
              <TableHead className="text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <CategoriesTableSkeleton />
            ) : (
              filtered.map(category => (
                <TableRow
                  key={category._id}
                  className="hover:bg-maroon-50"
                >
                  <TableCell className="font-medium">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    {category.productsCount} Products
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/categories/${category._id}`}
                        className={cn(
                          buttonVariants({
                            variant: 'outline',
                            size: 'sm',
                          }),
                          'gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950',
                        )}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>

                      {/* delete component */}
                      <DeleteCategoryButton
                        id={category._id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
        {/* Previous */}
        <Button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="rounded border px-3 py-1 disabled:opacity-40"
        >
          Previous
        </Button>

        {/* Page Numbers */}
        {pages.map(p => (
          <Button
            key={p}
            onClick={() => setPage(p)}
            className={`rounded border px-3 py-1 transition ${
              page === p
                ? 'border-maroon-600 bg-maroon-600 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {p}
          </Button>
        ))}

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="rounded border px-3 py-1 disabled:opacity-40"
        >
          Next
        </button>
      </div>
      
    </div>
  );
}
