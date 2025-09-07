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
          {currentLocale === 'en' && (
            <Check className="text-primary mr-2 h-4 w-4" />
          )}{' '}
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocale('ru')}>
          {currentLocale === 'ru' && (
            <Check className="text-primary mr-2 h-4 w-4" />
          )}{' '}
          Русский
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
