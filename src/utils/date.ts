import { Locale, format, formatDistance, formatRelative } from 'date-fns';
import { enUS, ko, ru } from 'date-fns/locale';

type SupportedLocale = 'en' | 'ru' | 'kr';

// Map app locale codes to date-fns locale objects
export const dateLocales: Record<SupportedLocale, Locale> = {
  en: enUS,
  ru: ru,
  kr: ko,
};

/**
 * Format a date using date-fns with the appropriate locale
 * @param date The date to format
 * @param formatStr The format string to use
 * @param locale The locale code (e.g., 'en', 'ru', 'kr')
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
 * @param locale The locale code (e.g., 'en', 'ru', 'kr')
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
 * @param locale The locale code (e.g., 'en', 'ru', 'kr')
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
