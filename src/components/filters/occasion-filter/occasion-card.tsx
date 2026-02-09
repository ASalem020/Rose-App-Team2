import Image from 'next/image'
import { cn } from '@/lib/utils/tailwind-merge';

type Props = {
  name: string
  image: string
  selected?: boolean
  onClick?: () => void
}

export function OccasionCard({
  name,
  image,
  selected = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'relative h-28 w-full overflow-hidden rounded-xl transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary',
        selected && 'ring-2 ring-primary'
      )}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center text-sm font-medium text-white transition',
          selected ? 'bg-black/60' : 'bg-black/40 hover:bg-black/60'
        )}
      >
        {name}
      </div>
    </button>
  )
}
