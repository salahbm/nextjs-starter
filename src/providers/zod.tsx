'use client';

import { useEffect } from 'react';

import { useLocale } from 'next-intl';

import { applyZodLocale } from '@/utils/zod-locale';

import type { Locale } from '@/i18n/routing';

// Syncs Zod's built-in locale + custom error map on every app locale change.
const ZodInitProvider = () => {
  const locale = useLocale();

  useEffect(() => {
    applyZodLocale(locale as Locale);
  }, [locale]);

  return null;
};

export default ZodInitProvider;
