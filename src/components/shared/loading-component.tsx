import { cn } from '@/lib/utils/tailwind-merge';
import { Loader } from 'lucide-react';
import { useTranslations } from 'next-intl';

type LoadingComponentPropsType = {
  iconSize?: number;
  className?: string;
};

export default function LoadingComponent({
  iconSize = 16,
  className,
}: LoadingComponentPropsType) {
  const t = useTranslations('common');

  return (
    <div
      className={cn(
        // Main Styles
        'loading-component flex animate-pulse items-center gap-1 text-zinc-800',
        // Dark Styles
        'dark:text-zinc-50',
        // Custom Classes
        className,
      )}
    >
      <Loader className="animate-spin" size={iconSize} />
      <p
        className={cn(
          // Main Styles
          'loading-message font-medium',
        )}
      >
        {t('loading')}
      </p>
    </div>
  );
}
