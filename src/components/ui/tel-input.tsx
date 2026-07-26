import { AsYouType } from 'libphonenumber-js';
import { Phone } from 'lucide-react';

import { cn } from '@/lib/utils';

import { TFieldValues } from '@/types/global';

import { Input } from './input';

interface TelephoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  showIcon?: boolean;
  formatPhoneNumber?: boolean;
  value?: TFieldValues;
}

export function TelephoneInput({
  className,
  showIcon = false,
  formatPhoneNumber = true,
  onChange,
  value,
  ...props
}: TelephoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    if (formatPhoneNumber) {
      // auto-add + if value exists and not starting with +
      if (input && !input.startsWith('+')) {
        input = '+' + input.replace(/[^\d]/g, '');
      }

      // remove + if empty
      if (!input) {
        e.target.value = '';
      } else {
        const formatter = new AsYouType('US'); // or prop/locale
        e.target.value = formatter.input(input);
      }
    }

    onChange?.(e);
  };

  return (
    <div className="relative">
      {showIcon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
          <Phone className="h-4 w-4" aria-hidden="true" />
        </div>
      )}
      <Input
        type="tel"
        className={cn(showIcon && 'pl-10', className)}
        onChange={handleChange}
        value={value}
        {...props}
      />
    </div>
  );
}
