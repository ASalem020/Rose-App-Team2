import SectionHeader from '@/components/shared/section-header';
import React from 'react';
import TestimonialsContent from './components/testimonials-content';

export default function Testimonials() {
  return (
    <div className="testimonials">
      <SectionHeader
        title="Testimonials"
        description="Real Words from Happy Customers"
      />
      <TestimonialsContent />
    </div>
  );
}
