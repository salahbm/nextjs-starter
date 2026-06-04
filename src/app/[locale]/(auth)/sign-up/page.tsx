import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

import { SignUpView } from '@/views/auth/sign-up';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: t('signUp.title'),
    description: t('signUp.subtitle'),
  };
}

export default function SignUpPage() {
  return <SignUpView />;
}
