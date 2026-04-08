// Imports


import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils/tailwind-merge';


// Types


type Props = {
  className?: string;
};


// Component


/**
 * AccountHeader - Page heading for the account section
 *
 * Renders the translated "Account" / "حسابي" title.
 * Accepts an optional className to allow the parent to override styles.
 *
 * @param className - Optional extra Tailwind classes for the heading
 */
export default function AccountHeader({ className }: Props) {

  // Translation


  const t = useTranslations('pages.profile');


  // Render


  return (
    <div className="p-5">
      <h1
        className={cn(
          'font-extrabold mb-3 text-4xl text-zinc-800 tracking-wider',
          className,
        )}
      >
        {t('title')}
      </h1>
    </div>
  );
}
