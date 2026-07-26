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

type LocaleOption = {
  code: string;
  label: string;
};

const LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: 'Oʻzbekcha' },
];

export function LanguageToggle() {
  const t = useTranslations('Header');
  const { currentLocale, handleLocale } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={t('language')}>
          <Globe className="size-5" />
          {
            LOCALE_OPTIONS.find((option) => option.code === currentLocale)
              ?.label
          }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
