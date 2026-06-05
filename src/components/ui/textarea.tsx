import * as React from 'react';

import { cn } from '@/lib/utils';

import { TFieldValues } from '@/types/global';

// Create a new interface that extends the HTML textarea attributes
// but modifies the value prop to accept our custom TFieldValues type
interface TextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value'
> {
  value?: TFieldValues;
}

function Textarea({ className, value, ...props }: TextareaProps) {
  // Convert value to a format acceptable by HTML textarea
  const processedValue: string = React.useMemo(() => {
    if (value === undefined || value === null) {
      return '';
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value);
  }, [value]);

  // Create a new props object without the original value prop
  // to avoid passing it directly to the textarea element
  const { ...textareaProps } = props;

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-36 w-full rounded border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground hover:border-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      value={processedValue}
      {...textareaProps}
    />
  );
}

export { Textarea };
