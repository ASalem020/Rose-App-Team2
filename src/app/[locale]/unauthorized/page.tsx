import Image from 'next/image';
import BackToHomeBtn from './_components/back-to-home-btn';
import { useTranslations } from 'next-intl';
import GeneralPagesText from '@/components/shared/general-pages-text';

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
        {/* General Pages Text */}
        <GeneralPagesText
          mainMessage={t('main-message')}
          subMessage={t('sub-message')}
        />

        {/* Back To Home Button */}
        <BackToHomeBtn buttonText={t('back-home')} />
      </div>
    </main>
  );
}
