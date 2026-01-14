import { COMPANIES } from '@/lib/constants/Home page/home.constant';
import Image from 'next/image';
import React from 'react';

export default function Companies() {
  return (
    <section className="m-auto mb-96 mt-36 flex w-fit flex-col gap-10 rounded-2xl bg-maroon-50 px-6 py-10 dark:bg-zinc-700">
      {/* Heading */}
      <h3 className="text-center text-4xl font-bold text-maroon-700 dark:text-softPink-200">
        Trusted by over{' '}
        <span className="text-softPink-500 dark:text-maroon-400">
          4.5k+
        </span>{' '}
        companies
      </h3>

      {/* Companies Logos */}
      <div className="flex justify-center gap-16">
        {COMPANIES.map((company, index) => (
          <Image
            key={index}
            src={`/assets/images/companies/${company}`}
            alt="company logo"
            width={146}
            height={50}
          />
        ))}
      </div>
    </section>
  );
}
