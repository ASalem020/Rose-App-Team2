'use client';
import GeneralPagesText from '@/components/shared/general-pages-text';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Error() {
  // Translations
  const t = useTranslations('pages.error-page');

  return (
    <div className="error-page flex min-h-screen flex-col items-center justify-center gap-12">
      {/* Server Down Image */}
      <div className="image-container relative mx-auto size-96">
        <Image
          src="/assets/images/server-down.png"
          alt="Server down image"
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
