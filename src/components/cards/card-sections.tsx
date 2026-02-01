import Image from 'next/image';
import { RoseCardtype } from '@/types/cardstype';

export default function RoseCard({
  image,
  header,
  details,
}: RoseCardtype) {
  return (
    // display imag
    <div className="relative h-64 w-full overflow-hidden rounded-2xl">
      {/* Background image */}
      <Image
        src={image}
        alt={header}
        fill
        className="object-cover"
      />
      {/* overlay  */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-end p-5 text-white">
        <div className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-maroon-600">
            {header}
          </span>
          {/* Card description */}
          <h3 className="text-2xl font-semibold leading-snug">
            {details}
          </h3>
        </div>
      </div>
    </div>
  );
}
