'use client';

import Image from 'next/image';

import { LanguageToggle, ThemeToggle } from '@/components/shared/header';

import { BRAND } from '@/constants/brand';
import { IMAGES } from '@/constants/images';

import { Link } from '@/i18n/routing';

export function AuthHeader() {
  return (
    <header className="absolute top-0 right-0 left-0 z-40 flex h-16 items-center justify-between px-4 sm:px-6">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={IMAGES.logo}
          alt={`${BRAND.name} logo`}
          width={28}
          height={28}
          priority
        />
        <span className="typo-header linear-gradient font-bold">
          {BRAND.name}
        </span>
      </Link>
      <div className="flex items-center gap-1 lg:text-white lg:[&_button:hover]:text-white lg:[&_button[aria-expanded=true]]:text-white">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
