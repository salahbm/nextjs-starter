import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';

import { ForgotPasswordView } from '@/views/auth/forgot-password';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: t('forgotPassword.title'),
    description: t('forgotPassword.subtitle'),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
