import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

import { SignInView } from '@/views/auth/sign-in';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: t('signIn.title'),
    description: t('signIn.subtitle'),
  };
}

export default function SignInPage() {
  return <SignInView />;
}
