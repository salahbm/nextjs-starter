'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Input } from './input';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  showToggle?: boolean;
  value?: string | number | Date | string[] | undefined;
}

export function PasswordInput({ className, showToggle = true, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('pr-10', className)}
        {...props}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-neutral-500" aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5 text-neutral-500" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
