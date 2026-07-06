import * as React from 'react';

import { cn } from '@/lib/utils';

interface TimeInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  value?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: Date) => void;
}

const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, value, onChange, onValueChange, ...props }, ref) => {
    // Prevent infinite loops by using a ref to track if we're handling a time button click
    const isTimeButtonClick = React.useRef(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isTimeButtonClick.current) {
        isTimeButtonClick.current = false;
        return;
      }

      const newValue = e.target.value;
      onChange?.(newValue);
    };

    const handleTimeButtonClick = React.useCallback(
      (time: string) => {
        isTimeButtonClick.current = true;
        onChange?.(time);

        if (onValueChange) {
          const newDate = new Date();
          const [hours, minutes] = time.split(':').map(Number);
          newDate.setHours(hours || 0, minutes || 0);
          onValueChange(newDate);
        }
      },
      [onChange, onValueChange],
    );

    return (
      <div>
        <input
          type="time"
          value={value}
          onChange={handleChange}
          step={60} // seconds step: 60 = 1 minute increments
          className={cn(
            'typo-caption-1 w-full rounded border border-input bg-transparent px-3 py-2 transition-[color,box-shadow] outline-none placeholder:text-muted-foreground hover:border-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            '08:00',
            '09:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
          ].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleTimeButtonClick(time)}
              aria-pressed={value === time}
              className={cn(
                'typo-caption-1 cursor-pointer rounded p-2 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                value === time
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

TimeInput.displayName = 'TimeInput';

export { TimeInput };
