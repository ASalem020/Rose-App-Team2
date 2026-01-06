import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
  cva,
  type VariantProps,
} from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils/tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-maroon-700 disabled:bg-zinc-300 disabled:text-zinc-500',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-maroon-100 disabled:bg-zinc-300 disabled:text-zinc-500',
        outline:
          'border border-primary bg-background hover:bg-secondary text-primary disabled:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400',
        subtle:
          'text-zinc-800 border border-zinc-400 bg-zinc-50 hover:bg-zinc-100 disabled:bg-zinc-100 disabled:border-zinc-300 disabled:text-zinc-400',
        ghost:
          'hover:bg-accent text-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-400',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-red-700 disabled:bg-zinc-300 disabled:text-zinc-500',
      },
      size: {
        default: 'h-10 px-14 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {children}
        {loading && (
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
