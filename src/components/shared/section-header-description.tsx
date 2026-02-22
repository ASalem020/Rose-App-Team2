import React from 'react';

type SectionHeaderDescriptionPropsType = {
  description: string;
};

export default function SectionHeaderDescription({
  description,
}: SectionHeaderDescriptionPropsType) {
  return (
    <p className="relative w-fit text-start text-2xl font-bold text-maroon-700 before:absolute before:start-0 before:top-3/4 before:z-0 before:h-4 before:w-3/4 before:rounded-e-2xl before:bg-softPink-100 after:absolute after:-bottom-1.5 after:start-0 after:z-0 after:h-0.5 after:w-40 after:bg-softPink-600 md:mx-auto md:text-center md:text-3xl lg:text-4xl dark:text-softPink-200 before:dark:bg-zinc-700 after:dark:bg-softPink-500">
      <span className="relative z-10">{description}</span>
    </p>
  );
}
