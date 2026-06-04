'use client';

import Image from 'next/image';

import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { BRAND } from '@/constants/brand';
import { IMAGES } from '@/constants/images';

import { Link } from '@/i18n/routing';
import { useSidebar } from '@/store/sidebar';

import Avatar from './avatar';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-1 md:gap-0 lg:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggle()}
            className="lg:hidden"
            aria-label="toggleSidebar"
          >
            <Menu className="size-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={IMAGES.logo}
              alt="Viza Master Logo"
              width={40}
              height={40}
              priority
            />
            <h1 className="linear-gradient text-md font-roboto font-bold lg:text-2xl">
              {BRAND.name}
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-1 lg:gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <Avatar />
        </div>
      </div>
    </header>
  );
}
