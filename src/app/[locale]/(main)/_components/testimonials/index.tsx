import SectionHeader from '@/components/shared/section-header';
import React from 'react';
import TestimonialsContent from './components/testimonials-content';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations(
    'pages.home.testimonials.header',
  );
  return (
    <div className="testimonials mt-36">
      <SectionHeader
        title={t('title')}
        description={t('description')}
      />
      <TestimonialsContent />
    </div>
  );
}
