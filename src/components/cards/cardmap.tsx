import Image from "next/image";
import {RoseCardtype} from '@/type/cardstype'

export default function CardMap({
  image,
  header,
  details,
}: RoseCardtype) {
  return (
    <div className="relative  h-[260px] w-full overflow-hidden rounded-[16px]">
      <Image
        src={image}
        alt={header}
        fill
        className="object-cover"
      />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-end p-5 text-white">
        <div className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-maroon-600">
            {header}
          </span>

          <h3 className="font-semibold leading-snug text-2xl">
            {details}
          </h3>
        </div>
      </div>
    </div>
  );
}
