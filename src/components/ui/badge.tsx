import * as React from 'react';
import {
  cva,
  type VariantProps,
} from 'class-variance-authority';

import { cn } from '@/lib/utils/tailwind-merge';

const badgeVariants = cva(
  'inline-flex items-center rounded-full  px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: `bg-primary text-background hover:bg-maroon-700  
            dark:hover:bg-softPink-400`,
        secondary: `bg-secondary text-secondary-foreground hover:bg-maroon-100  dark:hover:bg-zinc-600`,
        subtle: `bg-zinc-100 text-zinc-700 hover:bg-zinc-200
        dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
