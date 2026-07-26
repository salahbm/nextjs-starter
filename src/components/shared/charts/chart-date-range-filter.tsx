'use client';

import { useCallback, useState } from 'react';

import { addMonths, endOfDay, startOfDay, subDays, subMonths } from 'date-fns';

import { DatePicker } from '@/components/shared/date-pickers';
import { Combobox } from '@/components/ui/combobox';

import { cn } from '@/lib/utils';

export type ChartDatePreset =
  | 'today'
  | '7-days'
  | '1-month'
  | '3-months'
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter';

export type ChartDateSelection = ChartDatePreset | 'custom';

export interface ChartDateRange {
  from: Date;
  to?: Date;
}

export interface ChartDateRangeFilterProps {
  className?: string;
  defaultPreset?: ChartDatePreset;
  onRangeChange?: (
    range: ChartDateRange,
    selection: ChartDateSelection,
  ) => void;
}

const presetOptions: Array<{ value: ChartDatePreset; label: string }> = [
  { value: 'today', label: 'Today' },
  { value: '7-days', label: 'Last 7 days' },
  { value: '1-month', label: 'Last 30 days' },
  { value: '3-months', label: 'Last 90 days' },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
];

const seasonStartMonths = {
  spring: 2,
  summer: 5,
  autumn: 8,
  winter: 11,
} as const;

function getSeasonRange(
  season: keyof typeof seasonStartMonths,
  today: Date,
): ChartDateRange {
  const startMonth = seasonStartMonths[season];
  let from = new Date(today.getFullYear(), startMonth, 1);

  if (from > today) {
    from = new Date(today.getFullYear() - 1, startMonth, 1);
  }

  return {
    from: startOfDay(from),
    to: endOfDay(subDays(addMonths(from, 3), 1)),
  };
}

function getPresetRange(preset: ChartDatePreset): ChartDateRange {
  const today = new Date();
  const to = endOfDay(today);

  switch (preset) {
    case 'today':
      return { from: startOfDay(today), to };
    case '7-days':
      return { from: startOfDay(subDays(today, 6)), to };
    case '1-month':
      return { from: startOfDay(subMonths(today, 1)), to };
    case '3-months':
      return { from: startOfDay(subMonths(today, 3)), to };
    case 'spring':
    case 'summer':
    case 'autumn':
    case 'winter':
      return getSeasonRange(preset, today);
  }
}

export function ChartDateRangeFilter({
  className,
  defaultPreset = '7-days',
  onRangeChange,
}: ChartDateRangeFilterProps) {
  const [selection, setSelection] = useState<ChartDateSelection>(defaultPreset);
  const [range, setRange] = useState<ChartDateRange | undefined>(() =>
    getPresetRange(defaultPreset),
  );

  const updateRange = useCallback(
    (nextRange: ChartDateRange, nextSelection: ChartDateSelection) => {
      setRange(nextRange);
      onRangeChange?.(nextRange, nextSelection);
    },
    [onRangeChange],
  );

  const handlePresetChange = (value: string | string[]) => {
    if (typeof value !== 'string') {
      return;
    }

    const nextPreset = value as ChartDatePreset;
    setSelection(nextPreset);
    updateRange(getPresetRange(nextPreset), nextPreset);
  };

  return (
    <div
      className={cn(
        'grid w-full gap-2 sm:grid-cols-[11rem_minmax(15rem,1fr)] lg:w-auto',
        className,
      )}
    >
      <Combobox
        aria-label="Date range preset"
        options={presetOptions}
        value={selection === 'custom' ? '' : selection}
        label={selection === 'custom' ? 'Custom range' : undefined}
        onValueChange={handlePresetChange}
        placeholder="Select range"
      />
      <DatePicker
        variant="range"
        value={range}
        dateFormat="MMM d, yyyy"
        onOpenChange={(open) => {
          if (open && selection !== 'custom') {
            setSelection('custom');
            setRange(undefined);
          }
        }}
        onChange={(value) => {
          if (
            value &&
            typeof value === 'object' &&
            'from' in value &&
            value.from instanceof Date
          ) {
            setSelection('custom');
            updateRange({ from: value.from, to: value.to }, 'custom');
          }
        }}
        placeholder="Select custom range"
      />
    </div>
  );
}
