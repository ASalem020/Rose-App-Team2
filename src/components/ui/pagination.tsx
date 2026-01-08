import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';

import { cn } from '@/lib/utils/tailwind-merge';
import {
  ButtonProps,
  buttonVariants,
} from '@/components/ui/button';

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn(
      'mx-auto flex w-full justify-center',
      className,
    )}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      'flex flex-row items-center gap-1',
      className,
    )}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'default' : 'outline',
        size,
      }),
      'h-9 w-9 rounded-xl border p-0',
      isActive &&
        'border-maroon-600 bg-maroon-600 text-white hover:bg-maroon-700 dark:border-rose-300 dark:bg-rose-300 dark:text-rose-950 dark:hover:bg-rose-400',
      !isActive &&
        'border-zinc-200 bg-transparent text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-500',
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    className={cn('', className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationDoublePrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    size="icon"
    className={cn('tracking-tighter', className)}
    {...props}
  >
    <div className="flex -space-x-2">
      <ChevronLeft className="h-4 w-4" />
      <ChevronLeft className="h-4 w-4" />
    </div>
  </PaginationLink>
);
PaginationDoublePrevious.displayName =
  'PaginationDoublePrevious';

const PaginationDoubleNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    size="icon"
    className={cn('tracking-tighter', className)}
    {...props}
  >
    <div className="flex -space-x-2">
      <ChevronRight className="h-4 w-4" />
      <ChevronRight className="h-4 w-4" />
    </div>
  </PaginationLink>
);
PaginationDoubleNext.displayName = 'PaginationDoubleNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn(
      'flex h-9 w-9 items-center justify-center',
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationDoubleNext,
  PaginationDoublePrevious,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
