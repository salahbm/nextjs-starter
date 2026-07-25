'use client';

import Image from 'next/image';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { BRAND } from '@/constants/brand';
import { IMAGES } from '@/constants/images';

import { Link } from '@/i18n/routing';
import { useSidebar } from '@/store/sidebar';

export default function Header() {
  const { toggle, isMinimized } = useSidebar();
  const t = useTranslations('Header');

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background md:hidden">
      <div className="flex h-12 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggle()}
            className="md:hidden"
            aria-label={t('toggleSidebar')}
          >
            {isMinimized ? (
              <Menu className="size-5" />
            ) : (
              <X className="size-5" />
            )}
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={IMAGES.logo}
              alt={`${BRAND.name} logo`}
              width={26}
              height={26}
              priority
            />
            <h1 className="text-md font-roboto linear-gradient font-bold">
              {BRAND.name}
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
}
