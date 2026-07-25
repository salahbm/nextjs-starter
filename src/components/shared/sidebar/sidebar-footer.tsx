'use client';

import Image from 'next/image';

import { Check, ChevronsUpDown, Globe, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

import useTranslation from '@/hooks/common/use-translation';
import { Link } from '@/i18n/routing';

type SidebarFooterProps = {
  isMinimized: boolean;
};

const SidebarFooter = ({ isMinimized }: SidebarFooterProps) => {
  const t = useTranslations('Header');
  const { currentLocale, handleLocale } = useTranslation();
  const { setTheme } = useTheme();

  return (
    <footer className="mt-auto p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2 px-2',
              isMinimized && 'justify-center px-0',
            )}
          >
            <Image src="/logos/logo.png" alt="logo" width={24} height={24} />
            {!isMinimized && (
              <span className="flex w-full items-center gap-1">
                Account settings{' '}
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
              </span>
            )}
            <span className="sr-only">Account settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="top" className="w-52">
          <DropdownMenuItem asChild>
            <Link href="/preferences">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="mr-2 size-5" />
              {t('language')}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleLocale('en')}>
                English
                {currentLocale === 'en' && (
                  <Check className="ml-auto size-5 text-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLocale('ru')}>
                Русский
                {currentLocale === 'ru' && (
                  <Check className="ml-auto size-5 text-primary" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLocale('kr')}>
                한국어
                {currentLocale === 'kr' && (
                  <Check className="ml-auto size-5 text-primary" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 size-5 dark:hidden" />
              <Moon className="mr-2 hidden size-5 dark:block" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-44">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </footer>
  );
};

export default SidebarFooter;
