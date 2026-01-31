'use client'
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import { useLocale, useTranslations } from "next-intl"


export default function AuthToggleLangButton() {
  // Translation
  const t = useTranslations('pages.auth');
  const locale = useLocale();

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions
  const toggleLang = () => {
    router.push(`${pathname}${location.search}`, {
      locale: locale === 'en' ? 'ar' : 'en'
    })
  }
  return (
    <div className={cn(
      'auth-toggle-lang-button w-full mb-10 duration-300 hover:text-maroon-600 cursor-pointer text-end',
      locale === 'en' && 'font-tajawal'
    )}
      onClick={toggleLang}>{t('toggle-lang')}</div>
  )
}
