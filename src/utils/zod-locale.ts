import * as z from 'zod';

import type { Locale } from '@/i18n/routing';

// =============================================================================
// Zod v4 Internationalization
// =============================================================================
// Architecture:
// 1. Zod's built-in locales (zod/v4/locales/*.js) handle standard errors
//    (invalid_type, too_small, too_big, etc.)
// 2. A per-locale customError map handles app-specific errors via
//    issue.code === 'custom' + issue.params.customCode
// 3. ZodInitProvider calls applyZodLocale() on every locale change
// =============================================================================

// ---------------------------------------------------------------------------
// Custom error maps — one per supported locale
// ---------------------------------------------------------------------------

/** English custom error map */
export const enLocale = (): z.ZodErrorMap => {
  return (issue) => {
    // App-specific custom codes
    if (issue.code === 'custom') {
      switch (issue.params?.customCode) {
        case 'custom.required':
          return 'This field is required';
        case 'custom.email_invalid':
          return 'Please enter a valid email address';
        case 'custom.password_min':
          return 'Password must be at least 6 characters';
        case 'custom.password_strong':
          return 'Password must contain uppercase, lowercase, number, and special character';
        case 'custom.password_match':
          return 'Passwords do not match';
        case 'custom.username_min':
          return 'Username must be at least 3 characters';
      }
    }

    // Override standard Zod messages for better UX
    if (issue.code === 'invalid_format' && issue.format === 'email') {
      return 'Please enter a valid email address';
    }
    if (issue.code === 'too_small' && issue.origin === 'string') {
      return `Must be at least ${issue.minimum} characters`;
    }
    if (issue.code === 'invalid_type' && issue.input === undefined) {
      return 'This field is required';
    }

    return undefined; // let built-in locale handle others
  };
};

/** Russian custom error map */
export const ruLocale = (): z.ZodErrorMap => {
  return (issue) => {
    // App-specific custom codes
    if (issue.code === 'custom') {
      switch (issue.params?.customCode) {
        case 'custom.required':
          return 'Обязательное поле';
        case 'custom.email_invalid':
          return 'Пожалуйста, введите действительный адрес электронной почты';
        case 'custom.password_min':
          return 'Пароль должен содержать не менее 6 символов';
        case 'custom.password_strong':
          return 'Пароль должен содержать заглавную, строчную букву, цифру и спецсимвол';
        case 'custom.password_match':
          return 'Пароли не совпадают';
        case 'custom.username_min':
          return 'Имя пользователя должно содержать не менее 3 символов';
      }
    }

    // Override standard Zod messages for natural Russian
    if (issue.code === 'invalid_format' && issue.format === 'email') {
      return 'Пожалуйста, введите корректный email';
    }
    if (issue.code === 'too_small' && issue.origin === 'string') {
      return `Минимум ${issue.minimum} символов`;
    }
    if (issue.code === 'invalid_type' && issue.input === undefined) {
      return 'Обязательное поле';
    }

    return undefined;
  };
};

/** Uzbek custom error map */
export const uzLocale = (): z.ZodErrorMap => {
  return (issue) => {
    // App-specific custom codes
    if (issue.code === 'custom') {
      switch (issue.params?.customCode) {
        case 'custom.required':
          return 'Bu maydon majburiy';
        case 'custom.email_invalid':
          return 'Iltimos, toʻgʻri elektron pochta manzilini kiriting';
        case 'custom.password_min':
          return 'Parol kamida 6 ta belgidan iborat boʻlishi kerak';
        case 'custom.password_strong':
          return 'Parol katta harf, kichik harf, raqam va maxsus belgidan iborat boʻlishi kerak';
        case 'custom.password_match':
          return 'Parollar mos kelmadi';
        case 'custom.username_min':
          return 'Foydalanuvchi nomi kamida 3 ta belgidan iborat boʻlishi kerak';
      }
    }

    // Override standard Zod messages for natural Uzbek
    if (issue.code === 'invalid_format' && issue.format === 'email') {
      return 'Iltimos, toʻgʻri elektron pochta manzilini kiriting';
    }
    if (issue.code === 'too_small' && issue.origin === 'string') {
      return `Kamida ${issue.minimum} ta belgi boʻlishi kerak`;
    }
    if (issue.code === 'invalid_type' && issue.input === undefined) {
      return 'Bu maydon majburiy';
    }

    return undefined;
  };
};

// ---------------------------------------------------------------------------
// Locale → custom error map registry
// ---------------------------------------------------------------------------
const customErrorMaps: Record<Locale, () => z.ZodErrorMap> = {
  en: enLocale,
  ru: ruLocale,
  uz: uzLocale,
};

// ---------------------------------------------------------------------------
// applyZodLocale — sets both built-in locale AND customError map
// ---------------------------------------------------------------------------

/**
 * Loads Zod's built-in locale for standard messages and applies the
 * app-specific customError map. Called by ZodInitProvider on locale change.
 */
export async function applyZodLocale(locale: Locale): Promise<void> {
  const customError = customErrorMaps[locale]?.() ?? enLocale();

  try {
    const mod = await import(`zod/v4/locales/${locale}.js`);
    z.config({ ...mod.default(), customError });
  } catch {
    // Fallback to English if Zod doesn't ship the requested locale
    const mod = await import('zod/v4/locales/en.js');
    z.config({ ...mod.default(), customError });
  }
}

// ---------------------------------------------------------------------------
// required() — reusable helper for required fields
// ---------------------------------------------------------------------------

/** Wraps any schema with a custom.required refinement. */
export const required = <T extends z.ZodTypeAny>(schema: T) =>
  schema.refine(
    (value) => value !== undefined && value !== null && value !== '',
    { params: { customCode: 'custom.required' } },
  );
