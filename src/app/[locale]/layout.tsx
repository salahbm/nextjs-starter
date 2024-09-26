import type { Metadata } from 'next';
import pretendard from '@/styles/fonts';
import { getTranslations } from 'next-intl/server';
import { BRAND_NAME } from '@/constants/brand';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Params): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const title = t('home.title', { brand: BRAND_NAME });
  const description = t('home.description', { brand: BRAND_NAME });

  return {
    title,
    description,
    metadataBase: new URL(`http://localhost:3000`),
  };
}

export default function IndexLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
