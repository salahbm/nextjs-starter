'use client';

import { useCallback, useTransition } from 'react';

import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';

import { COOKIE_KEYS } from '@/constants/cookies';

import { Locale, routing, usePathname, useRouter } from '@/i18n/routing';

const useTranslation = () => {
  // Use next-intl's locale-aware router and pathname (not next/navigation)
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();
  const { locales } = routing;

  const handleLocale = useCallback(
    (value: string) => {
      Cookies.set(COOKIE_KEYS.LANGUAGE, value, { expires: 365 });

      // next-intl's router.replace handles locale prefix automatically —
      // no manual path segment manipulation needed.
      startTransition(() => {
        router.replace(
          { pathname: pathname as '/' },
          { locale: value as Locale },
        );
      });
    },
    [pathname, router],
  );

  return { locales, currentLocale, handleLocale, isPending };
};

export default useTranslation;
