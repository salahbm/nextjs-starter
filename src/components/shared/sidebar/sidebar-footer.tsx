'use client';

import Image from 'next/image';

import {
  Check,
  ChevronsUpDown,
  Globe,
  LogOut,
  Monitor,
  Moon,
  Sun,
} from 'lucide-react';
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

import { IMAGES } from '@/constants/images';

import useTranslation from '@/hooks/common/use-translation';
import { Link } from '@/i18n/routing';

type SidebarFooterProps = {
  isMinimized: boolean;
};

type LocaleOption = {
  code: string;
  label: string;
};

type ThemeOption = {
  value: 'light' | 'dark' | 'system';
  labelKey: 'light' | 'dark' | 'system';
  icon: typeof Sun;
};

const LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: 'Oʻzbekcha' },
];

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light', labelKey: 'light', icon: Sun },
  { value: 'dark', labelKey: 'dark', icon: Moon },
  { value: 'system', labelKey: 'system', icon: Monitor },
];

const SidebarFooter = ({ isMinimized }: SidebarFooterProps) => {
  const t = useTranslations('Header');
  const { currentLocale, handleLocale } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <footer className="mt-auto px-2 pt-1 pb-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'h-11 w-full cursor-pointer justify-start gap-2 px-2 text-sm',
              isMinimized && 'justify-center px-0',
            )}
          >
            <Image
              src={IMAGES.logo}
              alt="logo"
              width={24}
              height={24}
              className="shrink-0"
            />
            {!isMinimized && (
              <p className="flex w-full items-center gap-1">
                <span
                  className={cn(
                    'overflow-hidden whitespace-nowrap transition-all duration-300',
                    isMinimized
                      ? 'max-w-0 opacity-0 blur-sm'
                      : 'blur-0 max-w-xs opacity-100',
                  )}
                >
                  {t('accountSettings')}
                </span>
                <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
              </p>
            )}
            <span className="sr-only">{t('accountSettings')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMinimized ? 'center' : 'start'}
          side="top"
          sideOffset={8}
          className="w-56 max-w-[calc(100vw-1.5rem)]"
        >
          <DropdownMenuItem asChild>
            <Link href="/preferences">{t('profile')}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="mr-2 size-4" />
              {
                LOCALE_OPTIONS.find((option) => option.code === currentLocale)
                  ?.label
              }
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {LOCALE_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  onClick={() => handleLocale(option.code)}
                >
                  {option.label}
                  {currentLocale === option.code && (
                    <Check className="ml-auto size-4 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 size-4 dark:hidden" />
              <Moon className="mr-2 hidden size-4 dark:block" />
              {t('theme')}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {THEME_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                  >
                    <Icon className="mr-2 size-4" />
                    {t(option.labelKey)}
                    {theme === option.value && (
                      <Check className="ml-auto size-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 size-4" />
            {t('logout')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </footer>
  );
};

export default SidebarFooter;
