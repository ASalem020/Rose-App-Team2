import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import TestimonialItem from './testimonial-item';
import { cn } from '@/lib/utils/tailwind-merge';
import { testimonials } from '../constants/testimonials';

export default function TestimonialsContent() {
  return (
    <div className="testimonials-content bg-maroon-50 p-2 pb-24 pt-14">
      {/* Carousel */}
      <Carousel>
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
            {/* Carousel Items */}
            {testimonials.map(testimonial => {
              return (
                // Carousel Item
                <CarouselItem
                  key={testimonial.name}
                  className={cn(
                    // Main Styles
                    'flex items-center justify-center pl-16',
                    // Media Queries
                    'md:basis-1/2 lg:basis-1/3',
                  )}
                >
                  <TestimonialItem {...testimonial} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
