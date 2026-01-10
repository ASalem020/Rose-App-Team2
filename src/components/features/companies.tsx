import Image from 'next/image';
import React from 'react';

export default function Companies() {
  // Companies Logos
  const companies = [
    'image 36.svg',
    'image 40.svg',
    'image 41.svg',
    'image 38.svg',
    'image 39.svg',
    'image 37.svg',
  ];
  return (
    <div className="m-auto mb-96 mt-36 flex w-fit flex-col gap-10 rounded-2xl bg-maroon-50 px-6 py-10">
      {/* Heading */}
      <h3 className="text-center text-4xl font-bold text-maroon-700">
        Trusted by over{' '}
        <span className="text-softPink-500">4.5k+</span>{' '}
        companies
      </h3>

      {/* Companies Logos */}
      <div className="flex justify-center gap-16">
        {companies.map((company, index) => (
          <Image
            key={index}
            src={`/assets/images/companies/${company}`}
            alt="company"
            width={146}
            height={50}
          />
        ))}
      </div>
    </div>
  );
}
