import * as React from 'react';

import { cn } from '@/lib/utils';

import { TFieldValues } from '@/types/global';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'value'> {
  value?: TFieldValues;
}

function Input({ className, type, value, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'typo-caption-1 md:typo-body-1 typo-body-2 flex h-11 w-full min-w-0 rounded border border-input bg-transparent px-4 py-3 transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}

// Re-export specialized inputs for convenience
export { PasswordInput } from './password-input';
export { TelephoneInput } from './tel-input';
export { Input };
