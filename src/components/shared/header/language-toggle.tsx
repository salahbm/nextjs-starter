'use client';

import { Check, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useTranslation from '@/hooks/common/use-translation';

export function LanguageToggle() {
  const t = useTranslations();
  const { handleLocale, currentLocale } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('Header.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleLocale('en')}>
          English
          {currentLocale === 'en' && (
            <Check className="ml-auto h-4 w-4 text-primary" />
          )}{' '}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocale('ru')}>
          Русский
          {currentLocale === 'ru' && (
            <Check className="ml-auto h-4 w-4 text-primary" />
          )}{' '}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocale('kr')}>
          한국어
          {currentLocale === 'kr' && (
            <Check className="ml-auto h-4 w-4 text-primary" />
          )}{' '}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
