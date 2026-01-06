import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils/tailwind-merge';

export interface LabeledInputProps extends React.ComponentProps<
  typeof Input
> {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

const LabeledInput = React.forwardRef<
  HTMLInputElement,
  LabeledInputProps
>(
  (
    {
      label,
      className,
      labelClassName,
      containerClassName,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = React.useId();
    const finalId = id || inputId;

    return (
      <div
        className={cn(
          'grid w-full items-center gap-2',
          containerClassName,
        )}
      >
        <Label htmlFor={finalId} className={labelClassName}>
          {label}
        </Label>
        <Input
          ref={ref}
          id={finalId}
          className={className}
          {...props}
        />
      </div>
    );
  },
);

LabeledInput.displayName = 'LabeledInput';

export { LabeledInput };
