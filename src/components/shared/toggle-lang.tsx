'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Language = {
  code: 'en' | 'ar';
  label: string;
  nativeLabel: string;
};

const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية' },
];

export default function ToggleLang() {
  // Translation
  const locale = useLocale();
  const t = useTranslations('common.language');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions
  const switchLanguage = (langCode: 'en' | 'ar') => {
    if (langCode !== locale) {
      router.push(`${pathname}${location.search}`, {
        locale: langCode,
      });
    }
  };

  const currentLanguage = LANGUAGES.find(
    lang => lang.code === locale,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 hover:text-maroon-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-maroon-400"
          aria-label={t('toggle')}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {currentLanguage?.nativeLabel}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[140px]"
      >
        {LANGUAGES.map(language => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2"
          >
            <span className="flex flex-col">
              <span className="font-tajawal font-medium">
                {language.nativeLabel}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {language.label}
              </span>
            </span>
            {locale === language.code && (
              <Check className="h-4 w-4 text-maroon-600 dark:text-maroon-400" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
