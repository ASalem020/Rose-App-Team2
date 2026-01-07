import { cn } from '@/lib/utils/tailwind-merge';
import { Loader } from 'lucide-react';

type LoadingComponentPropsType = {
  iconSize?: number;
  loadingClasses?: string;
};

export default function LoadingComponent({
  iconSize = 16,
  loadingClasses,
}: LoadingComponentPropsType) {
  return (
    <div
      className={cn(
        // Main Styles
        'loading-component flex animate-pulse items-center gap-1 text-zinc-800',
        // Dark Styles
        'dark:text-zinc-50',
      )}
    >
      <Loader className="animate-spin" size={iconSize} />
      <p
        className={cn(
          // Main Styles
          'loading-message font-medium',
          // Custom Classes
          loadingClasses,
        )}
      >
        Loading ...
      </p>
    </div>
  );
}
