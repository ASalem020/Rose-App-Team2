import { cn } from '@/lib/utils/tailwind-merge';

type SectionHeaderTitlePropsType = {
  title: string;
};

export default function SectionHeaderTitle({
  title,
}: SectionHeaderTitlePropsType) {
  return (
    <h6
      className={cn(
        // Main Styles
        'mb-2 text-start text-sm font-bold uppercase tracking-[.25rem] text-softPink-500',
        // Dark Styles
        'dark:text-maroon-400',
        // Media Queries
        'md:text-center md:text-base',
      )}
    >
      {title}
    </h6>
  );
}
