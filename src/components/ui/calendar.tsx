'use client';

import * as React from 'react';

import { ru } from 'date-fns/locale';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { Combobox } from './combobox';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();
  const lang = useLocale();

  const locale = React.useMemo(() => {
    return lang === 'ru' ? ru : undefined;
  }, [lang]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn(
        'group/calendar w-full bg-background p-3 [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-4 flex-col md:flex-row relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none !h-auto',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none !h-auto',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center justify-center h-(--cell-size) gap-1.5',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-popover inset-0 opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded flex-1 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-(--cell-size)',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l [&:last-child[data-selected=true]_button]:rounded-r group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn('rounded-l bg-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded data-[selected=true]:rounded-none',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-4', className)} {...props} />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-4', className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        Dropdown: ({ value, onChange, options, name }) => {
          const isMonthDropdown =
            name === 'month' || (options && options.length === 12);
          const isYearDropdown =
            name === 'year' || (options && options.length > 12);

          let formattedOptions = options;

          if (isMonthDropdown) {
            formattedOptions = options?.map((option) => {
              const monthValue =
                typeof option.value === 'number'
                  ? option.value
                  : parseInt(String(option.value));

              const date = new Date();
              date.setMonth(monthValue);

              const monthName = date.toLocaleString(lang, { month: 'short' });

              return {
                ...option,
                value: monthValue,
                label: monthName,
              };
            });
          }

          const handleChange = (value: string | string[]) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange?.(changeEvent);
          };

          let selectedLabel = '';
          if (isMonthDropdown && value !== undefined) {
            const selectedOption = formattedOptions?.find(
              (option) => String(option.value) === String(value),
            );
            if (selectedOption) {
              selectedLabel = String(selectedOption.label);
            }
          }

          return (
            <div className="relative w-full cursor-pointer">
              <Combobox
                modalPopover
                value={value as string}
                onValueChange={handleChange}
                options={formattedOptions?.map((option) => ({
                  ...option,
                  value: String(option.value),
                  label: String(option.label),
                }))}
                className="flex h-auto w-full cursor-pointer items-center justify-center gap-2 border-none px-0 py-0"
                searchable={isYearDropdown}
                label={isMonthDropdown ? selectedLabel : undefined}
              />
            </div>
          );
        },

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'font-caption-1 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-ring/50 data-[range-end=true]:rounded data-[range-end=true]:rounded-r data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:rounded data-[range-start=true]:rounded-l data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground dark:hover:text-accent-foreground [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
