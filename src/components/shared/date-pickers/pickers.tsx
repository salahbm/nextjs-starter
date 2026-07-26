'use client';

import * as React from 'react';

import { CalendarIcon, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FieldError } from 'react-hook-form';

import { MonthPicker } from '@/components/shared/date-pickers/month-picker';
import { TimePicker } from '@/components/shared/date-pickers/time-picker';
import {
  DatePickerVariant,
  DateRangeValue,
  DEFAULT_MAX_DATE,
  DEFAULT_MIN_DATE,
  formatPickerValue,
  isDateDisabled,
  toPickerDate,
  toPickerRange,
  useDateLocale,
} from '@/components/shared/date-pickers/utils';
import { YearPicker } from '@/components/shared/date-pickers/year-picker';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

import {
  clampDate,
  formatTimeString,
  mergeDateAndTime,
  toCalendarDate,
} from '@/utils/date';

import { TFieldValues } from '@/types/global';

export type DatePickerChange = Date | DateRangeValue | undefined;

export interface DatePickerProps {
  /** The currently selected value (Date, range or serialized date string) */
  value?: TFieldValues;
  /** Callback function when the value changes */
  onChange?: (value: DatePickerChange) => void;
  /** Literal placeholder text when no value is selected */
  placeholder?: string;
  /** Disable the date picker */
  disabled?: boolean;
  /** Custom CSS class for the trigger button */
  className?: string;
  /** Format for displaying the selected date */
  dateFormat?: string;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Show the calendar caption as month/year dropdowns */
  dropdownCalendar?: boolean;
  /** Error state for form validation */
  error?: FieldError;
  /** Variant of the date picker */
  variant?: DatePickerVariant;
  /** Minute increments used by the time column */
  minuteStep?: number;
  /** Callback when the picker popover opens or closes */
  onOpenChange?: (open: boolean) => void;
}

const DEFAULT_PLACEHOLDER_KEYS: Record<DatePickerVariant, string> = {
  default: 'placeholder.date',
  range: 'placeholder.date',
  month: 'placeholder.date',
  year: 'placeholder.date',
  time: 'placeholder.time',
  'date-time': 'placeholder.datetime',
};

const DEFAULT_TIME = '12:00';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  dateFormat = 'PPP',
  minDate = DEFAULT_MIN_DATE,
  maxDate = DEFAULT_MAX_DATE,
  dropdownCalendar = true,
  error,
  variant = 'default',
  minuteStep = 5,
  onOpenChange,
}) => {
  const t = useTranslations('Common');
  const dateLocale = useDateLocale();
  const [open, setOpen] = React.useState(false);

  // Every variant reads from the same normalized value
  const selectedDate = React.useMemo(() => toPickerDate(value), [value]);
  const selectedRange = React.useMemo(() => toPickerRange(value), [value]);

  const [time, setTime] = React.useState(
    () => formatTimeString(selectedDate) || DEFAULT_TIME,
  );

  React.useEffect(() => {
    if (selectedDate) setTime(formatTimeString(selectedDate));
  }, [selectedDate]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  /** Date-only variants: anchor at noon so UTC serialization keeps the day */
  const commitDay = (day?: Date) => {
    if (!day) {
      onChange?.(undefined);
      return;
    }
    onChange?.(clampDate(toCalendarDate(day), minDate, maxDate));
    handleOpenChange(false);
  };

  /** Date + time variants: keep the calendar day, apply the selected time */
  const commitDateTime = (day?: Date, nextTime: string = time) => {
    const base = day ?? selectedDate ?? new Date();
    onChange?.(clampDate(mergeDateAndTime(base, nextTime), minDate, maxDate));
  };

  const handleTimeChange = (nextTime: string) => {
    setTime(nextTime);
    commitDateTime(undefined, nextTime);
  };

  const handleRangeSelect = (range?: DateRangeValue) => {
    if (!range?.from && !range?.to) {
      onChange?.(undefined);
      return;
    }

    const next: DateRangeValue = {
      from: range.from ? toCalendarDate(range.from) : undefined,
      to: range.to ? toCalendarDate(range.to) : undefined,
    };

    onChange?.(next);
  };

  const displayValue = formatPickerValue(
    value,
    variant,
    dateFormat,
    dateLocale,
  );
  const placeholderText =
    placeholder ?? t(DEFAULT_PLACEHOLDER_KEYS[variant] as never);

  // Open the calendar on the selected month, falling back to today in range
  const defaultMonth = clampDate(
    selectedRange?.from ?? selectedDate ?? new Date(),
    minDate,
    maxDate,
  );

  const calendarProps = {
    captionLayout: dropdownCalendar
      ? ('dropdown' as const)
      : ('label' as const),
    defaultMonth,
    startMonth: minDate,
    endMonth: maxDate,
    disabled: (date: Date) => isDateDisabled(date, minDate, maxDate),
  };

  const renderPickerContent = () => {
    switch (variant) {
      case 'date-time':
        return (
          <Tabs defaultValue="date" className="w-full min-w-72 p-3">
            <TabsList className="w-full">
              <TabsTrigger value="date" className="flex-1">
                {t('date')}
              </TabsTrigger>
              <TabsTrigger value="time" className="flex-1">
                {t('time')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="date">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(day) => commitDateTime(day)}
                {...calendarProps}
              />
            </TabsContent>
            <TabsContent value="time" className="mt-2">
              <TimePicker
                value={time}
                onChange={handleTimeChange}
                minuteStep={minuteStep}
              />
            </TabsContent>
          </Tabs>
        );
      case 'time':
        return (
          <div className="w-72 p-3">
            <TimePicker
              value={time}
              onChange={handleTimeChange}
              minuteStep={minuteStep}
            />
          </div>
        );
      case 'month':
        return (
          <MonthPicker
            value={selectedDate}
            onValueChange={commitDay}
            minDate={minDate}
            maxDate={maxDate}
          />
        );
      case 'year':
        return (
          <YearPicker
            value={selectedDate}
            onValueChange={commitDay}
            minDate={minDate}
            maxDate={maxDate}
          />
        );
      case 'range':
        return (
          <Calendar
            mode="range"
            selected={selectedRange as { from: Date; to?: Date } | undefined}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
            {...calendarProps}
          />
        );
      default:
        return (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={commitDay}
            {...calendarProps}
          />
        );
    }
  };

  const Icon = variant === 'time' ? Clock : CalendarIcon;

  return (
    <Popover modal open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        className={cn(
          'typo-caption-1 flex h-11 w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded border border-input bg-transparent px-4 py-3 transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground hover:border-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          !displayValue && 'text-muted-foreground',
          error && 'border-destructive',
          className,
        )}
        disabled={disabled}
        aria-invalid={Boolean(error)}
      >
        <span className="truncate">{displayValue ?? placeholderText}</span>
        <Icon className="size-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" sideOffset={5}>
        {renderPickerContent()}
        {displayValue && (
          <div className="flex justify-end border-t border-border p-2">
            <button
              type="button"
              onClick={() => {
                onChange?.(undefined);
                handleOpenChange(false);
              }}
              className="typo-caption-2 rounded px-3 py-1.5 text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {t('reset')}
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
