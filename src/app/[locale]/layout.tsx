import React, { Suspense } from 'react';

import { notFound } from 'next/navigation';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Viewport } from 'next';
import { hasLocale } from 'next-intl';

import Loader from '@/components/ui/loader';

import { cn } from '@/lib/utils';

import { manrope } from '@/constants/fonts';

import { routing } from '@/i18n/routing';
import RootLayout from '@/providers/root';
import '@/styles/globals.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(`http://localhost:3000`),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: ['nextjs-starter', 'admin', 'dashboard'],
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default async function IndexLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('overflow-hidden font-sans', manrope.className)}>
        <Suspense fallback={<Loader />}>
          <RootLayout>{children}</RootLayout>
        </Suspense>
      </body>
    </html>
  );
}
