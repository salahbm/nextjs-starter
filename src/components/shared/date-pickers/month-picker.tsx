import * as React from 'react';

import { format, setMonth, setYear } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useDateLocale } from '@/components/shared/date-pickers/utils';

import { cn } from '@/lib/utils';

interface MonthPickerProps {
  value?: Date;
  onValueChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const navButtonClass = (isDisabled: boolean) =>
  cn(
    'rounded p-2 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
    isDisabled
      ? 'cursor-not-allowed opacity-50'
      : 'hover:bg-accent hover:text-accent-foreground',
  );

export function MonthPicker({
  value,
  onValueChange,
  // Local-time constructors — string dates parse as UTC and shift by timezone
  minDate = new Date(1900, 0, 1),
  maxDate = new Date(2100, 11, 31),
  className,
}: MonthPickerProps) {
  const t = useTranslations('Common');
  const dateLocale = useDateLocale();

  // Use current date if no value is provided
  const currentDate = React.useMemo(() => value || new Date(), [value]);
  const [year, setYearView] = React.useState(() => currentDate.getFullYear());

  // Update year when value changes
  React.useEffect(() => {
    if (value) {
      setYearView(value.getFullYear());
    }
  }, [value]);

  // Navigate to previous year
  const handlePrevYear = React.useCallback(() => {
    setYearView((prevYear) => Math.max(minDate.getFullYear(), prevYear - 1));
  }, [minDate]);

  // Navigate to next year
  const handleNextYear = React.useCallback(() => {
    setYearView((prevYear) => Math.min(maxDate.getFullYear(), prevYear + 1));
  }, [maxDate]);

  // Select a month
  const handleSelectMonth = React.useCallback(
    (monthIndex: number) => {
      if (!onValueChange) return;

      // date-fns setYear/setMonth clamp day overflow (Jan 31 -> Feb 28)
      // instead of rolling into the next month like Date#setMonth does
      const newDate = setMonth(setYear(currentDate, year), monthIndex);

      // Ensure date is within min/max range
      if (newDate < minDate) {
        onValueChange(new Date(minDate));
      } else if (newDate > maxDate) {
        onValueChange(new Date(maxDate));
      } else {
        onValueChange(newDate);
      }
    },
    [currentDate, year, onValueChange, minDate, maxDate],
  );

  return (
    <div className={cn('p-3', className)}>
      <div className="flex flex-col space-y-4">
        {/* Year navigation */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrevYear}
              disabled={year <= minDate.getFullYear()}
              className={navButtonClass(year <= minDate.getFullYear())}
              aria-label={t('previousYear')}
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <div className="typo-caption-1 min-w-[60px] text-center">
              {year}
            </div>
            <button
              type="button"
              onClick={handleNextYear}
              disabled={year >= maxDate.getFullYear()}
              className={navButtonClass(year >= maxDate.getFullYear())}
              aria-label={t('nextYear')}
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 12 }, (_, i) => {
            const monthName = format(new Date(year, i, 1), 'MMM', {
              locale: dateLocale,
            });
            const isSelected =
              value instanceof Date &&
              value.getMonth() === i &&
              value.getFullYear() === year;

            const isDisabled =
              (year === minDate.getFullYear() && i < minDate.getMonth()) ||
              (year === maxDate.getFullYear() && i > maxDate.getMonth());

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectMonth(i)}
                disabled={isDisabled}
                aria-pressed={isSelected}
                className={cn(
                  'typo-caption-1 cursor-pointer rounded p-4 capitalize transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  isDisabled && 'cursor-not-allowed opacity-50',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {monthName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
