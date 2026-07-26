import { format, Locale } from 'date-fns';
import { useLocale } from 'next-intl';

import { cn } from '@/lib/utils';

import { dateLocales, isDayOutOfRange, toLocalDate } from '@/utils/date';

import { TFieldValues } from '@/types/global';

export type DatePickerVariant =
  | 'default'
  | 'date-time'
  | 'time'
  | 'range'
  | 'month'
  | 'year';

export interface DateRangeValue {
  from?: Date;
  to?: Date;
}

/**
 * Local-time constructors — 'new Date("1900-01-01")' parses as UTC midnight,
 * which lands on Dec 31 1899 in timezones east of UTC.
 */
export const DEFAULT_MIN_DATE = new Date(1900, 0, 1);
export const DEFAULT_MAX_DATE = new Date(2100, 11, 31);

/** Variants that carry a time component */
export const TIME_VARIANTS: DatePickerVariant[] = ['time', 'date-time'];

// Custom hook to get the date-fns locale for the active app locale
export const useDateLocale = (): Locale | undefined => {
  const locale = useLocale();
  return dateLocales[locale as keyof typeof dateLocales];
};

/** Normalize any incoming field value into a local Date */
export const toPickerDate = (value?: TFieldValues): Date | undefined => {
  if (value && typeof value === 'object' && 'from' in value) {
    return toLocalDate(value.from);
  }
  return toLocalDate(value);
};

/** Normalize any incoming field value into a local date range */
export const toPickerRange = (
  value?: TFieldValues,
): DateRangeValue | undefined => {
  if (!value) return undefined;

  if (typeof value === 'object' && ('from' in value || 'to' in value)) {
    const from = toLocalDate(value.from);
    const to = toLocalDate(value.to);
    return from || to ? { from, to } : undefined;
  }

  const single = toLocalDate(value);
  return single ? { from: single, to: undefined } : undefined;
};

/**
 * Format the trigger label for a picker value. Returns `undefined` when there
 * is nothing to display so the caller can render its placeholder.
 */
export const formatPickerValue = (
  value: TFieldValues | undefined,
  variant: DatePickerVariant,
  dateFormat: string,
  dateLocale?: Locale,
): string | undefined => {
  if (variant === 'range') {
    const range = toPickerRange(value);
    if (!range) return undefined;

    const from = range.from
      ? format(range.from, dateFormat, { locale: dateLocale })
      : '...';
    const to = range.to
      ? format(range.to, dateFormat, { locale: dateLocale })
      : '...';

    return `${from} - ${to}`;
  }

  const date = toPickerDate(value);
  if (!date) return undefined;

  switch (variant) {
    case 'date-time':
      return format(date, `${dateFormat} HH:mm`, { locale: dateLocale });
    case 'time':
      return format(date, 'HH:mm', { locale: dateLocale });
    case 'month':
      return format(date, 'LLLL yyyy', { locale: dateLocale });
    case 'year':
      return format(date, 'yyyy', { locale: dateLocale });
    default:
      return format(date, dateFormat, { locale: dateLocale });
  }
};

/**
 * Check if a date is disabled based on min/max constraints.
 * Compared by calendar day so a `minDate` of "now" still allows today.
 */
export const isDateDisabled = (
  date: Date,
  minDate: Date = DEFAULT_MIN_DATE,
  maxDate: Date = DEFAULT_MAX_DATE,
): boolean => isDayOutOfRange(date, minDate, maxDate);

/** Shared styling for the month / year / time grid cells */
export const pickerCellClass = ({
  selected,
  disabled,
}: {
  selected?: boolean;
  disabled?: boolean;
}) =>
  cn(
    'typo-caption-1 rounded px-3 py-2 text-center transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
    disabled && 'cursor-not-allowed opacity-50',
    !disabled && !selected && 'hover:bg-accent hover:text-accent-foreground',
    selected && 'bg-primary text-primary-foreground',
  );

/** Shared styling for the prev/next navigation buttons */
export const pickerNavClass = (disabled: boolean) =>
  cn(
    'rounded p-2 text-muted-foreground transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
    disabled
      ? 'cursor-not-allowed opacity-50'
      : 'hover:bg-accent hover:text-accent-foreground',
  );
