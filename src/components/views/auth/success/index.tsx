'use client';

import Link from 'next/link';

import { ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

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
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="text-primary h-16 w-16" />
        </div>

        <div>
          <h1 className="font-header">{finalTitle}</h1>
          <p className="font-body-2 text-muted-foreground mt-2">
            {finalMessage}
          </p>
        </div>

        <Button asChild className="w-full">
          <Link href={buttonHref}>
            {finalButtonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
