'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { AuthHeader } from '@/views/auth/header';

interface SuccessViewProps {
  type?: 'resetLinkSent' | 'generic';
  title?: string;
  message?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function SuccessView({
  type = 'generic',
  title,
  message,
  buttonText,
  buttonHref = '/sign-in',
}: SuccessViewProps) {
  const t = useTranslations('auth');

  // Use translations based on type or fallback to provided props
  const finalTitle =
    title ||
    (type === 'resetLinkSent' ? t('success.resetLinkSent.title') : 'Success!');
  const finalMessage =
    message ||
    (type === 'resetLinkSent'
      ? t('success.resetLinkSent.message')
      : 'Your request has been processed successfully.');
  const finalButtonText =
    buttonText ||
    (type === 'resetLinkSent'
      ? t('success.resetLinkSent.button')
      : t('signIn.button'));
  return (
    <div className="relative h-dvh overflow-hidden">
      <aside className="absolute inset-0 z-0">
        <Image
          src="/images/success-background.webp"
          alt="Auth background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </aside>
      <div className="absolute inset-0 z-1 bg-white/1 backdrop-blur-[2px]" />

      <main className="relative z-2 flex h-dvh flex-col items-center justify-center p-4">
        <AuthHeader />
        <div className="w-full max-w-md">
          <div className="space-y-6 text-center text-white">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>

            <div>
              <h1 className="typo-header">{finalTitle}</h1>
              <p className="typo-body-2 mt-2 text-white/70">{finalMessage}</p>
            </div>

            <Button asChild className="w-full">
              <Link href={buttonHref}>
                {finalButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
