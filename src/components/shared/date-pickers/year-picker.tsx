import * as React from 'react';

import { setYear as setYearOnDate } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  DEFAULT_MAX_DATE,
  DEFAULT_MIN_DATE,
  pickerCellClass,
  pickerNavClass,
} from '@/components/shared/date-pickers/utils';

import { cn } from '@/lib/utils';

interface YearPickerProps {
  value?: Date;
  onValueChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  yearsPerPage?: number;
}

export function YearPicker({
  value,
  onValueChange,
  minDate = DEFAULT_MIN_DATE,
  maxDate = DEFAULT_MAX_DATE,
  className,
  yearsPerPage = 12,
}: YearPickerProps) {
  const t = useTranslations('Common');
  // Use current date if no value is provided
  const currentDate = React.useMemo(() => value || new Date(), [value]);

  // Calculate the start year for the current view
  const [startYear, setStartYear] = React.useState(() => {
    const year = currentDate.getFullYear();
    return Math.floor(year / yearsPerPage) * yearsPerPage;
  });

  // Update start year when value changes
  React.useEffect(() => {
    if (value) {
      const year = value.getFullYear();
      setStartYear(Math.floor(year / yearsPerPage) * yearsPerPage);
    }
  }, [value, yearsPerPage]);

  // Navigate to previous year range
  const handlePrevYearRange = React.useCallback(() => {
    setStartYear((prev) =>
      Math.max(minDate.getFullYear(), prev - yearsPerPage),
    );
  }, [minDate, yearsPerPage]);

  // Navigate to next year range
  const handleNextYearRange = React.useCallback(() => {
    setStartYear((prev) => {
      const nextStart = prev + yearsPerPage;
      return nextStart <= maxDate.getFullYear() ? nextStart : prev;
    });
  }, [maxDate, yearsPerPage]);

  // Select a year — the caller clamps and normalizes the emitted date
  const handleSelectYear = React.useCallback(
    (year: number) => {
      // date-fns setYear clamps Feb 29 -> Feb 28 on non-leap years
      onValueChange?.(setYearOnDate(currentDate, year));
    },
    [currentDate, onValueChange],
  );

  // Calculate end year for display
  const endYear = Math.min(startYear + yearsPerPage - 1, maxDate.getFullYear());

  // Check if navigation buttons should be disabled
  const isPrevDisabled = startYear <= minDate.getFullYear();
  const isNextDisabled = startYear + yearsPerPage > maxDate.getFullYear();

  return (
    <div className={cn('p-3', className)}>
      <div className="flex flex-col space-y-4">
        {/* Year range navigation */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePrevYearRange}
              disabled={isPrevDisabled}
              className={pickerNavClass(isPrevDisabled)}
              aria-label={t('previousYears')}
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <div className="typo-caption-1 min-w-25 text-center">
              {startYear} - {endYear}
            </div>
            <button
              type="button"
              onClick={handleNextYearRange}
              disabled={isNextDisabled}
              className={pickerNavClass(isNextDisabled)}
              aria-label={t('nextYears')}
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>

        {/* Year grid */}
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: yearsPerPage }, (_, i) => {
            const year = startYear + i;
            if (year > maxDate.getFullYear()) return null;

            const isSelected =
              value instanceof Date && value.getFullYear() === year;
            const isDisabled =
              year < minDate.getFullYear() || year > maxDate.getFullYear();

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectYear(year)}
                disabled={isDisabled}
                aria-pressed={isSelected}
                className={cn(
                  pickerCellClass({
                    selected: isSelected,
                    disabled: isDisabled,
                  }),
                  'p-4',
                )}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
