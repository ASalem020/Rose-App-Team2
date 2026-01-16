'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { Check, Info, X } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      richColors
      icons={{
        success: (
          <Check className="h-4 w-4 text-emerald-700" />
        ),
        error: <X className="h-4 w-4 text-red-700" />,
        info: <Info className="h-4 w-4 text-zinc-800" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-zinc-800 group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-zinc-600',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success:
            'group-[.toaster]:!bg-emerald-50 group-[.toaster]:!border-emerald-700 group-[.toaster]:!text-zinc-800 dark:group-[.toaster]:!bg-emerald-300 dark:group-[.toaster]:!text-zinc-800',
          error:
            'group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-700 group-[.toaster]:!text-zinc-800 dark:group-[.toaster]:!bg-red-300 dark:group-[.toaster]:!text-zinc-800',
          info: 'group-[.toaster]:!bg-zinc-100 group-[.toaster]:!border-zinc-400 group-[.toaster]:!text-zinc-800 dark:group-[.toaster]:!bg-zinc-300 dark:group-[.toaster]:!text-zinc-800',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
