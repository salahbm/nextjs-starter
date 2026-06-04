import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

import { SuccessView } from '@/views/auth/success';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: t('success.resetLinkSent.title'),
    description: t('success.resetLinkSent.message'),
  };
}

export default function SuccessPage() {
  return <SuccessView type="resetLinkSent" />;
}
