import GeneralPagesText from '@/components/shared/general-pages-text';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function NotFound() {
  const t = useTranslations('pages.not-found');
  return (
    <div className="not-found-section flex min-h-screen flex-col items-center justify-center gap-12">
      {/* 404 Image */}
      <div className="image-container relative mx-auto h-40 w-80 md:h-80 md:w-[44.375rem]">
        <Image
          src="/assets/images/not-found.png"
          alt="404 image"
          fill
        />
      </div>

      {/* Content */}
      <div className="content flex flex-col items-center gap-1.5">
        <GeneralPagesText
          mainMessage={t('main-message')}
          subMessage={t('sub-message')}
          subMessageClassName="mt-4"
        />
      </div>
    </div>
  );
}
