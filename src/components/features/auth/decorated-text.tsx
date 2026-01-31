import { cn } from '@/lib/utils/tailwind-merge';
import { useLocale, useTranslations } from 'next-intl';
import { Alex_Brush } from 'next/font/google';

// Configure your fonts
const alexBrush = Alex_Brush({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-alex-brush',
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
      locale === 'ar' ? 'font-tajawal' : alexBrush.className,
      className
    )}>{text === 'login' ? t('login') : t('register')}</div>
  )
}
