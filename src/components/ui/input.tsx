'use client';
import * as React from 'react';
import {
  cva,
  type VariantProps,
} from 'class-variance-authority';
import {
  Eye,
  EyeOff,
  Search,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils/tailwind-merge';

const inputVariants = cva(
  `flex  h-10 w-full rounded-xl border border-input bg-background py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm hover:border hover:border-zinc-400 dark:border-zinc-600 dark:bg-secondary  dark:hover:border-zinc-500 focus:border-maroon-600 dark:focus:border-softPink-400 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:opacity-50 dark:disabled:text-zinc-600`,
  {
    variants: {
      variant: {
        default: 'px-3',
        text: 'px-3',
        search: 'pl-10 pr-3',
        password: 'pl-3 pr-10 rtl:pr-3 rtl:pl-10',
        upload:
          'pr-[140px] pl-3 cursor-pointer text-transparent disabled:text-transparent dark:disabled:text-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-transparent disabled:file:text-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends
    React.ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {
  onReview?: () => void;
  text?: string;
  error?: boolean;
}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      className,
      type,
      variant,
      placeholder,
      onReview,
      error,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] =
      React.useState(false);

    const [fileName, setFileName] = React.useState<
      string | null
    >(null);

    // Auto-detect variant based on type
    const resolvedVariant =
      variant ||
      (type === 'file'
        ? 'upload'
        : type === 'password'
          ? 'password'
          : 'default');

    // Determine the actual input type for password variant
    const resolvedType =
      resolvedVariant === 'password'
        ? showPassword
          ? 'text'
          : 'password'
        : type;

    const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (
        resolvedVariant === 'upload' &&
        e.target.files &&
        e.target.files.length > 0
      ) {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length === 1) {
          setFileName(selectedFiles[0].name);
        } else {
          setFileName(
            `${selectedFiles.length} files selected`,
          );
        }
      }
      if (onChange) {
        onChange(e);
      }
    };

    const inputElement = (
      <input
        type={resolvedType}
        placeholder={placeholder}
        defaultValue={props.text || props.defaultValue}
        className={cn(
          inputVariants({ variant: resolvedVariant }),
          className,
          {
            'dark:text-white': resolvedVariant !== 'upload',
            'border-red-600 dark:border-red-500': error,
          },
        )}
        ref={ref}
        onChange={handleFileChange}
        {...props}
      />
    );

    // Wrap with icon container for search and upload variants
    if (resolvedVariant === 'search') {
      return (
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          {inputElement}
        </div>
      );
    }

    if (resolvedVariant === 'password') {
      return (
        <div className="relative w-full">
          {inputElement}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none disabled:pointer-events-none ltr:right-3 rtl:left-3"
            tabIndex={-1}
            disabled={props.disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      );
    }

    if (resolvedVariant === 'upload') {
      return (
        <div className="relative w-full">
          {inputElement}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
            <div className="mr-2 flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              {onReview && (
                <button
                  type="button"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onReview();
                  }}
                  className="pointer-events-auto flex items-center gap-2 whitespace-nowrap text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ImageIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    Review current image(s)
                  </span>
                </button>
              )}
              {!onReview && fileName && (
                <span className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {fileName}
                </span>
              )}
            </div>
            <span
              className={cn(
                'flex shrink-0 items-center gap-2 whitespace-nowrap text-sm text-maroon-600 dark:text-softPink-400',
                props.disabled &&
                  'text-zinc-400 dark:text-zinc-600',
              )}
            >
              <Upload className="h-4 w-4" />
              Upload File
            </span>
          </div>
        </div>
      );
    }

    return inputElement;
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
