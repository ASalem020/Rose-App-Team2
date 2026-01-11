import { ArrowRight, Check } from 'lucide-react';
import React from 'react';
import { Button } from '../../components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils/tailwind-merge';

// About content
const aboutFeatures = [
  'Competitive Prices & Easy Shopping',
  'Premium Quality & Elegant Packaging',
  'Perfect for Every Occasion',
  'Fast & Reliable Delivery',
];

export default function About() {
  return (
    <section className="m-auto flex h-[24.375rem] w-4/5 gap-20">
      <div className="flex flex-row items-center justify-center gap-2">
        <div
          className={cn(
            // Main Styles
            'relative',
            // Before Styles
            'before:-z-10 before:w-[16.75rem]',
            'before:absolute before:-inset-2',
            'before:-translate-x-4 before:-translate-y-1.5 before:rotate-[3.09deg]',
            'before:rounded-[7.5rem] before:rounded-tl-[3.125rem]',
            'before:border-4 before:border-maroon-600',
          )}
        >
          {/* About Images */}
          <Image
            src="/assets/images/about/about-img-1.png"
            alt="logo"
            width={302}
            height={344}
            className="max-h-[21.5rem] max-w-72 rounded-[7.5rem] rounded-tl-[3.125rem]"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/assets/images/about/about-img-2.png"
            alt="logo"
            width={193}
            height={193}
            className="max-h-48 max-w-48 rounded-full"
          />
          <Image
            src="/assets/images/about/about-img-3.png"
            alt="logo"
            width={193}
            height={144}
            className="max-h-36 rounded-bl-[3.125rem] rounded-br-[6.25rem] rounded-tl-[3.125rem] rounded-tr-[6.25rem]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6">
        {/* Heading */}
        <p className="font-bold text-softPink-500 dark:text-maroon-400">
          ABOUT
        </p>

        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold text-maroon-700 dark:text-softPink-200">
            Delivering the{' '}
            <span className="text-softPink-500 dark:text-maroon-400">
              Finest
            </span>{' '}
            Gift Boxes for Your{' '}
            <span className="text-softPink-500">
              Special
            </span>{' '}
            Moments
          </h3>

          {/* Description */}
          <p className="leading-none text-zinc-500">
            Make every moment memorable with our premium
            gift boxes. Carefully curated and beautifully
            packaged, each box is filled with handpicked
            items designed to impress. Whether it&apos;s for
            a birthday, wedding, or a simple “thank you,”
            our gift boxes are crafted to leave a lasting
            impression — because thoughtful gifting starts
            here.
          </p>
        </div>

        <Button className="w-fit bg-maroon-500 dark:bg-softPink-200">
          Discover <ArrowRight />
        </Button>

        <ul className="grid w-fit grid-cols-2 gap-x-6">
          {aboutFeatures.map((feat, index) => (
            <li
              key={index}
              className="flex h-[2.625rem] items-center gap-5"
            >
              <Check className="size-5 text-maroon-700 dark:text-softPink-400" />{' '}
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
