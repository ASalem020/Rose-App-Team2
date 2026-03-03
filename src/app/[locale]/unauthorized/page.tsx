import Image from 'next/image';
import BackToHomeBtn from './_components/back-to-home-btn';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('pages.unauthorized');

  return (
    <main className="unauthorized-page flex min-h-screen flex-col items-center justify-center gap-12 bg-zinc-50">
      {/* Lock Image */}
      <div className="image-container relative mx-auto size-52 md:size-[22.5rem]">
        <Image
          src="/assets/images/unauthorized/lock-image.png"
          alt="lock image"
          fill
        />
      </div>

      {/* Content */}
      <div className="content flex flex-col items-center gap-1.5">
        {/* Main Message */}
        <p className="main-message text-center text-lg font-medium text-zinc-900 md:text-2xl rtl:font-tajawal">
          {t('main-message')}
        </p>

        {/* Sub Message */}
        <p className="sub-message mb-5 text-center text-sm text-zinc-400 md:text-xl rtl:font-tajawal">
          {t('sub-message')}
        </p>

        {/* Back To Home Button */}
        <BackToHomeBtn buttonText={t('back-home')} />
      </div>
    </main>
  );
}
