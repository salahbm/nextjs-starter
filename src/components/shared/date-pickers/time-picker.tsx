import * as React from 'react';

import { useTranslations } from 'next-intl';

import { pickerCellClass } from '@/components/shared/date-pickers/utils';

import { cn } from '@/lib/utils';

import { formatTimeString, parseTimeString } from '@/utils/date';

const QUICK_TIMES = ['09:00', '12:00', '15:00', '18:00'];

const pad = (value: number) => String(value).padStart(2, '0');

interface TimePickerProps {
  /** Selected time as 'HH:mm' or 'HH:mm:ss' */
  value?: string;
  /** Called with the next 'HH:mm' or 'HH:mm:ss' value */
  onChange?: (value: string) => void;
  /** Minute increments listed in the minutes column */
  minuteStep?: number;

  className?: string;
}

/**
 * Centers the active option inside its own scroll container.
 * Uses getBoundingClientRect so it works regardless of offsetParent.
 */
function useCenterInColumn(active: boolean) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!active) return;
    const element = ref.current;
    const container = element?.parentElement;
    if (!element || !container) return;

    const frame = requestAnimationFrame(() => {
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const elementTop =
        elementRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({
        top: elementTop - container.clientHeight / 2 + elementRect.height / 2,
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [active]);

  return ref;
}

function TimeColumn({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: number[];
  value: number;
  onSelect: (option: number) => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <span className="typo-caption-2 text-center text-muted-foreground">
        {label}
      </span>
      <div className="no-scrollbar flex h-44 flex-col gap-1 overflow-y-auto scroll-smooth rounded border border-input p-1">
        {options.map((option) => (
          <TimeOption
            key={option}
            option={option}
            selected={option === value}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function TimeOption({
  option,
  selected,
  onSelect,
}: {
  option: number;
  selected: boolean;
  onSelect: (option: number) => void;
}) {
  const ref = useCenterInColumn(selected);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(option)}
      className={pickerCellClass({ selected })}
    >
      {pad(option)}
    </button>
  );
}

function TimePicker({
  value,
  onChange,
  minuteStep = 1,

  className,
}: TimePickerProps) {
  const t = useTranslations('Common');
  const { hours, minutes } = parseTimeString(value);

  const hourOptions = React.useMemo(
    () => Array.from({ length: 24 }, (_, index) => index),
    [],
  );

  const minuteOptions = React.useMemo(() => {
    const step = Math.max(1, Math.min(30, minuteStep));
    const options = Array.from(
      { length: Math.ceil(60 / step) },
      (_, index) => index * step,
    );
    // Keep an out-of-step incoming value selectable
    return options.includes(minutes)
      ? options
      : [...options, minutes].sort((a, b) => a - b);
  }, [minuteStep, minutes]);

  const emit = (nextHours: number, nextMinutes: number) =>
    onChange?.(`${pad(nextHours)}:${pad(nextMinutes)}`);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="typo-subtitle tabular-nums">
          {pad(hours)}:{pad(minutes)}
        </span>
        <button
          type="button"
          onClick={() => onChange?.(formatTimeString(new Date()))}
          className="typo-caption-2 rounded px-2 py-1 text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {t('now')}
        </button>
      </div>

      <div className="flex gap-2">
        <TimeColumn
          label={t('hours')}
          options={hourOptions}
          value={hours}
          onSelect={(hour) => emit(hour, minutes)}
        />
        <TimeColumn
          label={t('minutes')}
          options={minuteOptions}
          value={minutes}
          onSelect={(minute) => emit(hours, minute)}
        />
      </div>

      <div className="grid grid-cols-4 gap-1">
        {QUICK_TIMES.map((time) => (
          <button
            key={time}
            type="button"
            aria-pressed={value === time}
            onClick={() => onChange?.(time)}
            className={pickerCellClass({ selected: value === time })}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { TimePickerProps };
export { TimePicker };
