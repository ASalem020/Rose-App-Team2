import { cn } from '@/lib/utils/tailwind-merge';

type SectionHeaderPropsType = {
  title: string;
  description: string;
};

export default function SectionHeader({
  title,
  description,
}: SectionHeaderPropsType) {
  return (
    <div className="section-header flex flex-col">
      {/* Title */}
      <h6 className="mb-2 text-start text-sm font-bold uppercase tracking-[.25rem] text-softPink-500 md:text-center md:text-base">
        {title}
      </h6>

      {/* Description */}
      <p
        className={cn(
          // Main Styles
          'relative w-fit text-start text-2xl font-bold text-maroon-700 md:text-center md:text-3xl lg:text-4xl',
          // Before Styles
          'before:absolute before:left-0 before:top-3/4 before:z-0 before:h-4 before:w-[25.125rem] before:rounded-r-2xl before:bg-softPink-100',
          // After Styles
          'after:absolute after:-bottom-1 after:left-0 after:z-0 after:h-[0.125rem] after:w-40 after:bg-softPink-600',
        )}
      >
        <span className="relative z-10">{description}</span>
      </p>
    </div>
  );
}
