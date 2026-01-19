import { cn } from '@/lib/utils/tailwind-merge';
import { useLocale, useTranslations } from 'next-intl';
import { Great_Vibes } from 'next/font/google';

// Configure your fonts
const greatVibes = Great_Vibes({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
});

type DecoratedTextPropsType = {
  text: "login" | "register",
  className?: string
}

export default function DecoratedText({ text, className }: DecoratedTextPropsType) {
  // Translation
  const locale = useLocale();
  const t = useTranslations('auth.decorated-text');

  return (
    <div className={cn(
      "text-center text-4xl md:text-5xl text-maroon-700",
      locale === 'ar' ? 'font-tajawal' : greatVibes.className,
      className
    )}>{text === 'login' ? t('login') : t('register')}</div>
  )
}
