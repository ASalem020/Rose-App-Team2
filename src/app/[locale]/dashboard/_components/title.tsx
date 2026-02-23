import { cn } from '@/lib/utils/tailwind-merge';

type props = {
  title: string;
  className?: string;
};

export default function TitleComponents({
  title,
  className,
}: props) {
  return (
    <h3
      className={cn(
        'mb-6 text-2xl font-semibold capitalize text-zinc-800',
        className,
      )}
    >
      {title}
    </h3>
  );
}
