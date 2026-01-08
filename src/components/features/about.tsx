import { ArrowRight, Check } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function About() {
  const aboutFeatures = [
    { feat: 'Competitive Prices & Easy Shopping' },
    { feat: 'Premium Quality & Elegant Packaging' },
    { feat: 'Perfect for Every Occasion' },
    { feat: 'Fast & Reliable Delivery' },
  ];
  return (
    <div className="m-auto flex w-4/5 gap-20">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image
          src="/assets/images/about-img-1.png"
          alt="logo"
          width={302}
          height={344}
          className="max-h-[21.5rem] max-w-72 rounded-[7.5rem] rounded-tl-[3.125rem]"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/assets/images/about-img-2.png"
            alt="logo"
            width={193}
            height={193}
            className="max-h-48 max-w-48 rounded-full"
          />
          <Image
            src="/assets/images/about-img-3.png"
            alt="logo"
            width={193}
            height={144}
            className="max-h-36 rounded-bl-[3.125rem] rounded-br-[6.25rem] rounded-tl-[3.125rem] rounded-tr-[6.25rem]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="font-bold text-softPink-500">ABOUT</p>
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-bold text-maroon-700">
            Delivering the{' '}
            <span className="text-softPink-500">
              Finest
            </span>{' '}
            {''}
            Gift Boxes for Your{' '}
            <span className="text-softPink-500">
              Special
            </span>{' '}
            Moments
          </h3>
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
        <Button className="w-fit bg-maroon-500">
          Discover <ArrowRight />
        </Button>
        <ul className="grid w-fit grid-cols-2 gap-x-6">
          {aboutFeatures.map((item, index) => (
            <li
              key={index}
              className="flex h-[2.625rem] items-center gap-5"
            >
              <Check className="size-5 text-maroon-700" />{' '}
              {item.feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
