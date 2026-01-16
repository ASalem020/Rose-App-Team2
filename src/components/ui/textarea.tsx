import * as React from 'react';
import {
  cva,
  type VariantProps,
} from 'class-variance-authority';

import { cn } from '@/lib/utils/tailwind-merge';

const textareaVariants = cva(
  'flex min-h-[80px] dark:text-white w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm hover:border hover:border-zinc-400 dark:border-zinc-600 dark:bg-secondary dark:hover:border-zinc-500 focus:border-maroon-600 dark:focus:border-softPink-400 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:opacity-50 dark:disabled:text-zinc-600',
  {
    variants: {
      variant: {
        default: '',
        text: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface TextareaProps
  extends
    React.ComponentProps<'textarea'>,
    VariantProps<typeof textareaVariants> {
  text?: string;
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, variant, text, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        textareaVariants({ variant }),
        className,
      )}
      ref={ref}
      defaultValue={text || props.defaultValue}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
