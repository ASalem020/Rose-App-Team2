'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, PackageOpen } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

// ─── Types ────────────────────────────────────────────────────────────────────

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
  /** Display name shown in the page heading  e.g. "Occasions" */
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getProductCount(item: EntityItem): number {
  return item.ProductCount ?? item.productsCount ?? 0;
}

/**
 * Returns true only for src values next/image accepts:
 *  - absolute URLs  (http:// or https://)
 *  - root-relative  (starts with /)
 * The API sometimes returns bare filenames — those are rejected.
 */
function isValidImageSrc(src: string | undefined): src is string {
  if (!src) return false;
  return src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/');
}

// ─── Skeleton Rows ────────────────────────────────────────────────────────────

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

// ─── Component ────────────────────────────────────────────────────────────────

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
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] =
    useState<EntityItem | null>(null);

  const filtered = (data ?? []).filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      onDelete(deleteTarget._id);
      setDeleteTarget(null);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            All {name}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your {name.toLowerCase()} and their products
          </p>
        </div>

        <Link
          href={addPath}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'gap-2 bg-rose-600 text-white hover:bg-rose-700',
          )}
        >
          <Plus className="h-4 w-4" />
          Add a new {name.toLowerCase().replace(/s$/, '')}
        </Link>
      </div>

      {/* ── Search ── */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          id={`search-${name.toLowerCase()}`}
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* ── Table Card ── */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-zinc-800">
              <TableHead className="w-[60px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading */}
            {isLoading && <TableSkeletonRows />}

            {/* Error */}
            {!isLoading && isError && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-16 text-center text-sm text-red-500"
                >
                  Failed to load {name.toLowerCase()}. Please try again.
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!isLoading && !isError && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <PackageOpen className="h-12 w-12 opacity-40" />
                    <p className="text-sm font-medium">
                      {search
                        ? `No ${name.toLowerCase()} match "${search}"`
                        : `No ${name.toLowerCase()} found`}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Data Rows */}
            {!isLoading &&
              !isError &&
              filtered.map(item => (
                <TableRow
                  key={item._id}
                  className="transition-colors hover:bg-rose-50/40 dark:hover:bg-rose-950/20"
                >
                  {/* Thumbnail */}
                  <TableCell>
                    {isValidImageSrc(item.image) ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-md border border-gray-100 dark:border-zinc-700">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-xs font-bold uppercase text-gray-400 dark:bg-zinc-700">
                        {item.name.slice(0, 2)}
                      </div>
                    )}
                  </TableCell>

                  {/* Name */}
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </TableCell>

                  {/* Product count */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal text-gray-600 dark:text-gray-300"
                    >
                      {getProductCount(item)} products
                    </Badge>
                  </TableCell>

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
                        Edit
                      </Link>

                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                        onClick={() => setDeleteTarget(item)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* ── Footer Count ── */}
      {!isLoading && !isError && (data ?? []).length > 0 && (
        <p className="text-xs text-gray-400">
          Showing {filtered.length} of {(data ?? []).length} {name.toLowerCase()}
        </p>
      )}

      {/* ── Delete Confirmation Dialog ── */}
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
              Delete {name.toLowerCase().replace(/s$/, '')}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-gray-800 dark:text-white">
                {deleteTarget?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {isDeleting ? 'Deleting…' : 'Yes, delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
