import {
  Locale,
  format,
  formatDistance,
  formatRelative,
  isValid,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  startOfDay,
} from 'date-fns';
import { enUS, ru, uz } from 'date-fns/locale';

type SupportedLocale = 'en' | 'ru' | 'uz';

// Map app locale codes to date-fns locale objects
export const dateLocales: Record<SupportedLocale, Locale> = {
  en: enUS,
  ru: ru,
  uz: uz,
};

/**
 * Format a date using date-fns with the appropriate locale
 * @param date The date to format
 * @param formatStr The format string to use
 * @param locale The locale code (e.g., 'en', 'ru', 'uz')
 * @returns The formatted date string
 */
export function formatDate(
  date: Date | number,
  formatStr: string,
  locale: SupportedLocale,
): string {
  return format(date, formatStr, { locale: dateLocales[locale] });
}

/**
 * Format the distance between two dates with the appropriate locale
 * @param date The date to compare to baseDate
 * @param baseDate The base date to compare from
 * @param locale The locale code (e.g., 'en', 'ru', 'uz')
 * @returns The formatted distance string
 */
export function formatDateDistance(
  date: Date | number,
  baseDate: Date | number,
  locale: SupportedLocale,
): string {
  return formatDistance(date, baseDate, { locale: dateLocales[locale] });
}

/**
 * Format a date relative to the current date with the appropriate locale
 * @param date The date to format
 * @param baseDate The base date to compare from
 * @param locale The locale code (e.g., 'en', 'ru', 'uz')
 * @returns The formatted relative date string
 */
export function formatDateRelative(
  date: Date | number,
  baseDate: Date | number,
  locale: SupportedLocale,
): string {
  return formatRelative(date, baseDate, { locale: dateLocales[locale] });
}

/* -----------------------------------------------------------------------------
 * Timezone handling
 *
 * Pickers and forms hold `Date` objects in the USER'S LOCAL timezone — a
 * calendar is inherently local. Convert at the API boundary only:
 *
 * - Date-only values (date / range / month / year pickers): serialize with
 *   `toDateOnlyString` ('yyyy-MM-dd') and parse with `fromDateOnlyString`.
 *   Never use `toISOString()` for these — for users west of UTC it shifts
 *   the value to the previous day.
 * - Date-time values (instants): serialize with `dateToISOString` (UTC) and
 *   parse with `isoStringToDate`; the resulting Date renders in local time.
 * ----------------------------------------------------------------------------- */

/**
 * Serialize a calendar date (no time component) for APIs and URLs.
 * @returns 'yyyy-MM-dd' in the user's local timezone, or '' when absent
 */
export const toDateOnlyString = (date?: Date): string =>
  date ? format(date, 'yyyy-MM-dd') : '';

/**
 * Parse a 'yyyy-MM-dd' string into a Date at LOCAL midnight, so the calendar
 * day round-trips unchanged in every timezone.
 */
export const fromDateOnlyString = (value?: string): Date | undefined => {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (!year) return undefined;
  return new Date(year, (month || 1) - 1, day || 1);
};

/**
 * Serialize an instant (date + time) as a UTC ISO-8601 string
 * @returns e.g. '2026-07-07T09:30:00.000Z', or '' when absent
 */
export const dateToISOString = (date?: Date) => date?.toISOString() ?? '';

/**
 * Parse a UTC ISO-8601 string into a Date (rendered in local time)
 */
export const isoStringToDate = (iso?: string) =>
  iso ? new Date(iso) : new Date();

/** Hour a calendar day is anchored at, see `toCalendarDate` */
export const CALENDAR_DAY_ANCHOR_HOUR = 12;

/** Matches a date-only string, e.g. '2026-07-07' */
const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Matches an 'HH:mm' (or 'HH:mm:ss') time string */
const TIME_PATTERN = /^(\d{1,2}):(\d{2})/;

/**
 * Parse any picker input into a LOCAL `Date`.
 * Date-only strings are parsed at local midnight instead of UTC midnight —
 * `new Date('2026-07-07')` is UTC and renders as Jul 6 west of UTC.
 */
export const toLocalDate = (value?: unknown): Date | undefined => {
  if (value === null || value === undefined || value === '') return undefined;
  if (value instanceof Date) return isValid(value) ? value : undefined;
  if (typeof value === 'number') {
    const fromNumber = new Date(value);
    return isValid(fromNumber) ? fromNumber : undefined;
  }
  if (typeof value !== 'string') return undefined;
  if (DATE_ONLY_PATTERN.test(value)) return fromDateOnlyString(value);
  const parsed = new Date(value);
  return isValid(parsed) ? parsed : undefined;
};

/**
 * Anchor a calendar day at local noon.
 *
 * Date-only selections carry no meaningful time, but consumers often
 * serialize them with `toISOString()`. Local midnight shifts to the previous
 * day for users west of UTC; noon survives any UTC offset (±12h), so the
 * calendar day never changes.
 */
export const toCalendarDate = (date: Date): Date =>
  setMilliseconds(
    setSeconds(setMinutes(setHours(date, CALENDAR_DAY_ANCHOR_HOUR), 0), 0),
    0,
  );

/** Parse an 'HH:mm' string into hours/minutes, defaulting to 00:00 */
export const parseTimeString = (
  time?: string,
): { hours: number; minutes: number } => {
  const match = time?.match(TIME_PATTERN);
  if (!match) return { hours: 0, minutes: 0 };
  return {
    hours: Math.min(23, Number(match[1])),
    minutes: Math.min(59, Number(match[2])),
  };
};

/** Format the time part of a date as 'HH:mm' */
export const formatTimeString = (date?: Date): string =>
  date ? format(date, 'HH:mm') : '';

/** Apply an 'HH:mm' time to a date, keeping the calendar day intact */
export const mergeDateAndTime = (date: Date, time?: string): Date => {
  const { hours, minutes } = parseTimeString(time);
  return setMilliseconds(
    setSeconds(setMinutes(setHours(date, hours), minutes), 0),
    0,
  );
};

/** Restrict a date to the [min, max] window */
export const clampDate = (date: Date, min?: Date, max?: Date): Date => {
  if (min && date < min) return new Date(min);
  if (max && date > max) return new Date(max);
  return date;
};

/** Compare two dates by calendar day only, ignoring their time parts */
export const isDayOutOfRange = (
  date: Date,
  min?: Date,
  max?: Date,
): boolean => {
  const day = startOfDay(date);
  if (min && day < startOfDay(min)) return true;
  if (max && day > startOfDay(max)) return true;
  return false;
};

/**
 * Get the year from a date
 * @param date The date to get the year from
 * @returns The year of the date
 */
export const dateToYear = (date?: Date): number =>
  date ? date.getFullYear() : 0;

/**
 * Build a Date (Jan 1, local midnight) from a year number
 */
export const yearToDate = (year?: number): Date =>
  year ? new Date(year, 0, 1) : new Date();

/**
 * Get the month index (0-11) from a date
 */
export const dateToMonth = (date?: Date): number =>
  date ? date.getMonth() : 0;

/**
 * Build a Date (1st of month, local midnight) from a month index (0-11)
 * @param month Month index 0-11
 * @param year Full year; defaults to the current year
 */
export const monthToDate = (month?: number, year?: number): Date =>
  new Date(year ?? new Date().getFullYear(), month ?? 0, 1);
