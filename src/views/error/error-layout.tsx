import type { ReactNode } from 'react';

import { ArrowLeft, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { routes } from '@/constants/routes';

import { Link } from '@/i18n/routing';

type ErrorLayoutProps = {
  code: string;
  title: string;
  description: string;
  actionLabel: string;
  actionType: 'home' | 'retry';
  onRetry?: () => void;
  icon?: ReactNode;
};

export function ErrorLayout({
  code,
  title,
  description,
  actionLabel,
  actionType,
  onRetry,
  icon,
}: ErrorLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--muted)_0%,transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative mb-8 flex items-center justify-center">
          <span
            className={cn(
              'leading-none font-bold select-none',
              'text-[clamp(6rem,22vw,14rem)]',
              'bg-linear-to-br from-primary/20 via-primary/10 to-transparent',
              'bg-clip-text text-transparent',
            )}
            aria-hidden
          >
            {code}
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
            {icon}
          </span>
        </div>

        <h1 className="typo-header mb-3 text-foreground">{title}</h1>
        <p className="typo-body-2 max-w-md text-muted-foreground">
          {description}
        </p>

        <div className="mt-8">
          {actionType === 'home' ? (
            <Button asChild size="lg" className="px-4">
              <Link href={routes.home}>
                <ArrowLeft data-icon="inline-start" />
                {actionLabel}
              </Link>
            </Button>
          ) : (
            <Button size="lg" onClick={onRetry} className="px-4">
              <RefreshCw data-icon="inline-start" />
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
