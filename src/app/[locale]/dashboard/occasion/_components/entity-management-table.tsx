'use client';


// Imports


import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, PackageOpen } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/tailwind-merge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';


// Types


export interface EntityItem {
  _id: string;
  name: string;
  image?: string;
  slug?: string;
  createdAt?: string;
  /** For occasions */
  ProductCount?: number;
  /** For categories */
  productsCount?: number;
}

interface EntityManagementTableProps {
  /** Display name shown in the page heading e.g. "Occasions" */
  name: string;
  /** The data array fetched from the API */
  data: EntityItem[] | undefined;
  /** Whether data is loading */
  isLoading: boolean;
  /** Whether data fetch failed */
  isError?: boolean;
  /** Route to navigate to when clicking "+ Add new" */
  addPath: string;
  /** Fn that returns the route for editing an item */
  editPath: (id: string) => string;
  /** Called when the user confirms deletion */
  onDelete: (id: string) => void;
  /** Whether the delete mutation is in-flight */
  isDeleting?: boolean;
}


// Helpers


/**
 * getProductCount - Normalises the product count field across entity types
 *
 * Occasions use `ProductCount`, categories use `productsCount`.
 */
function getProductCount(item: EntityItem): number {
  return item.ProductCount ?? item.productsCount ?? 0;
}

/**
 * isValidImageSrc - Guards against bare filenames that next/image rejects
 *
 * Returns true only for:
 *  - Absolute URLs  (http:// or https://)
 *  - Root-relative  (starts with /)
 * The API sometimes returns bare filenames — those are rejected.
 */
function isValidImageSrc(src: string | undefined): src is string {
  if (!src) return false;
  return src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/');
}


// Sub-components


/**
 * TableSkeletonRows - Placeholder rows shown while data is loading
 */
function TableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-10 w-10 rounded-md" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20 rounded-full" />
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}


// Component


/**
 * EntityManagementTable - Generic admin table for managing occasions or categories
 *
 * Features:
 * - Client-side search / filter
 * - Skeleton loading states
 * - Delete confirmation dialog
 * - Fully translated (EN / AR) via next-intl
 * - Reusable for occasions and categories
 *
 * @param name       - Display label used in the heading e.g. "Occasions"
 * @param data       - Array of entity items from the API
 * @param isLoading  - Whether the fetch is in-flight
 * @param isError    - Whether the fetch failed
 * @param addPath    - Route for the "Add new" button
 * @param editPath   - Function that returns the edit route for an item id
 * @param onDelete   - Callback invoked with the item id when deletion is confirmed
 * @param isDeleting - Whether the delete mutation is in-flight
 */
export default function EntityManagementTable({
  name,
  data,
  isLoading,
  isError = false,
  addPath,
  editPath,
  onDelete,
  isDeleting = false,
}: EntityManagementTableProps) {

  // Translation


  const t = useTranslations('pages.dashboard.occasion.table');


  // State


  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<EntityItem | null>(null);


  // Variables


  // Filtered list derived from the search query
  const filtered = (data ?? []).filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );


  // Handlers


  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      onDelete(deleteTarget._id);
      setDeleteTarget(null);
    }
  };


  // Render


  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {t('title')}
          </h1>
        </div>

        <Link
          href={addPath}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'gap-2 bg-rose-600 text-white hover:bg-rose-700',
          )}
        >
          <Plus className="h-4 w-4" />
          {t('addNew')}
        </Link>
      </div>

      {/* Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          id={`search-${name.toLowerCase()}`}
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden  bg-white  dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-zinc-800">
              <div className="flex items-center gap-2">
                <TableHead className=" max-w-40 w-full">{t('columns.name')}</TableHead>
                <TableHead>{t('columns.products')}</TableHead>
              </div>
              <TableHead className="text-right">{t('columns.actions')}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading skeletons */}
            {isLoading && <TableSkeletonRows />}

            {/* Error state */}
            {!isLoading && isError && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-16 text-center text-sm text-red-500"
                >
                  {t('error')}
                </TableCell>
              </TableRow>
            )}

            {/* Empty state */}
            {!isLoading && !isError && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <PackageOpen className="h-12 w-12 opacity-40" />
                    <p className="text-sm font-medium">
                      {search
                        ? t('empty.noMatch', { search })
                        : t('empty.noData')}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Data rows */}
            {!isLoading &&
              !isError &&
              filtered.map(item => (
                <TableRow
                  key={item._id}
                  className="transition-colors hover:bg-rose-200/40 dark:hover:bg-rose-950/20"
                >
                  <div className="flex  items-start gap-2 ">

                    {/* Name */}
                    <TableCell className=" max-w-40 w-full font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </TableCell>

                    {/* Product count */}
                    <TableCell>
                      <p className="text-xs font-normal text-gray-600 dark:text-gray-300">
                        {t('productCount', { count: getProductCount(item) })}
                      </p>
                    </TableCell>
                  </div>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={editPath(item._id)}
                        className={cn(
                          buttonVariants({ variant: 'outline', size: 'sm' }),
                          'gap-1.5 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950',
                        )}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        {t('edit')}
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                        onClick={() => setDeleteTarget(item)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {t('delete')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={open => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
              <Trash2 className="h-7 w-7 text-red-500" />
            </div>
            <AlertDialogTitle className="text-center">
              {t('deleteDialog.title')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {t('deleteDialog.description')}{' '}
              <span className="font-semibold text-gray-800 dark:text-white">
                {deleteTarget?.name}
              </span>
              {t('deleteDialog.suffix')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel disabled={isDeleting}>
              {t('deleteDialog.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {isDeleting ? t('deleteDialog.deleting') : t('deleteDialog.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
