import { WebSupport } from '@/types/supporttype';

export default function SupportInfo({
  icon,
  title,
  description,
}: WebSupport) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-4">
      {/* Icon container */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-600 text-white">
        <Icon size={30} strokeWidth={1} />
      </div>

      <div className="flex flex-col">
        {/* Support title */}
        <h4 className="text-xl font-semibold text-maroon-600">
          {title}
        </h4>
        {/* Support description */}
        <p className="text-sm text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}
