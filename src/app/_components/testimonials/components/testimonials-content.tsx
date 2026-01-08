'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import TestimonialItem from './testimonial-item';
import { cn } from '@/lib/utils/tailwind-merge';
import AutoScroll, {
  type AutoScrollType,
} from 'embla-carousel-auto-scroll';
import { useRef, type RefObject } from 'react';
import useTestimonials from '../hooks/use-testimonials';
import ErrorMessage from '@/components/shared/error-message';
import LoadingComponent from '@/components/shared/loading-component';

export default function TestimonialsContent() {
  // Refs
  const plugin: RefObject<AutoScrollType> = useRef(
    AutoScroll({
      speed: 1.2,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  // Hooks
  const { data, error, isLoading } = useTestimonials();

  return (
    <div
      className={cn(
        // Main Styles
        'testimonials-content bg-maroon-50 pb-24 pl-8 pt-14',
        // Dark Styles
        'dark:bg-zinc-700',
      )}
    >
      {/* Error */}
      {error && <ErrorMessage message={error.message} />}

      {/* Loading */}
      {isLoading && <LoadingComponent />}

      {/* Data Found */}
      {/* Carousel */}
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
          align: 'start',
          dragFree: true,
        }}
      >
        <div className="container mx-auto">
          {/* Carousel Content */}
          <CarouselContent
            className={cn(
              // Main Styles
              '-ml-16 pt-20',
              // Media Queries
              'lg:px-5',
            )}
          >
            {data?.message === 'success' && (
              <>
                {/* Carousel Items */}
                {(data.testimonials.length < 4
                  ? [
                      ...data.testimonials,
                      ...data.testimonials,
                    ]
                  : data.testimonials
                ).map((testimonial, i) => {
                  return (
                    // Carousel Item
                    <CarouselItem
                      key={`${testimonial._id}${i}`}
                      className={cn(
                        // Main Styles
                        'flex items-center justify-center pl-16',
                        // Media Queries
                        'md:basis-1/2 lg:basis-1/3',
                      )}
                    >
                      <TestimonialItem
                        name={`${testimonial.user.firstName} ${testimonial.user.lastName}`}
                        rate={testimonial.rating}
                        maxRate={5}
                        comment={testimonial.content}
                        date={new Date(
                          testimonial.createdAt,
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        imgSrc={testimonial.user.photo}
                      />
                    </CarouselItem>
                  );
                })}
              </>
            )}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
