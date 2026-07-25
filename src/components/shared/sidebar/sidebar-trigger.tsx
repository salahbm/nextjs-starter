'use client';

import { Fragment } from 'react';

import Image from 'next/image';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { BRAND } from '@/constants/brand';
import { IMAGES } from '@/constants/images';

import { Link } from '@/i18n/routing';
import { useSidebar } from '@/store/sidebar';

import SidebarNav from './sidebar-bar';
import SidebarFooter from './sidebar-footer';

export default function Sidebar() {
  const { isMinimized, toggle } = useSidebar();

  return (
    <Fragment>
      {/* Overlay */}
      {!isMinimized && (
        <div
          aria-hidden="true"
          aria-label="Close sidebar overlay"
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={toggle}
        />
      )}

      <aside
        className={cn(
          'fixed top-12 left-0 z-20 flex h-[calc(100dvh-3rem)] flex-col bg-background transition-all duration-300 md:relative md:top-0 md:z-auto md:h-dvh md:border-r',
          isMinimized
            ? 'w-0 -translate-x-full md:w-16 md:translate-x-0'
            : 'w-4/5 translate-x-0 md:w-64 lg:w-72',
        )}
      >
        <button
          type="button"
          aria-label="Toggle sidebar"
          className="shadow-1 border-border-200 absolute top-4 right-0 hidden w-0 translate-x-full cursor-pointer items-center justify-center rounded-r border border-l-0 bg-background py-4 md:flex md:w-5"
          onClick={toggle}
        >
          <ChevronRight
            className={cn('size-5', isMinimized ? 'rotate-0' : 'rotate-180')}
          />
        </button>

        {/* Navigation */}
        <Link
          href="/"
          className="hidden shrink-0 items-center gap-2 px-4 pt-7 pb-2 md:flex"
        >
          <Image
            src={IMAGES.logo}
            alt={`${BRAND.name} logo`}
            width={24}
            height={24}
            priority
          />
          <h1
            className={cn(
              'typo-title overflow-hidden linear-gradient whitespace-nowrap transition-all duration-300',
              isMinimized
                ? 'max-w-0 opacity-0 blur-sm'
                : 'blur-0 max-w-xs opacity-100',
            )}
          >
            {BRAND.name}
          </h1>
        </Link>
        <SidebarNav />
        <SidebarFooter isMinimized={isMinimized} />
      </aside>
    </Fragment>
  );
}
