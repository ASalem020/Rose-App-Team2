import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";

type props = {
  className? : string,
}

export default function HeaderComponent({ className} : props) {
    // ^ translations
  const t = useTranslations('pages.profile');

  return (
    <div className=" p-5">
      <h1 className={cn("font-extrabold mb-3 text-4xl text-zinc-800 tracking-wider" , className)}>
        {t('title')}
       </h1>
    </div>
  );
}
