import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BRAND_NAME } from '@/constants/brand';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';
import React from 'react';
import pretendard from '@/public/fonts';

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: { locale: string };
}>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const title = t('home.title', { brand: BRAND_NAME });
  const description = t('home.description', { brand: BRAND_NAME });

  return {
    title,
    description,
    metadataBase: new URL(`http://localhost:3000`),
  };
}

export default async function IndexLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>): Promise<JSX.Element> {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
