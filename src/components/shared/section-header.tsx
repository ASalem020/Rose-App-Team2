type SectionHeaderPropsType = {
  title: string;
  description: string;
};

export default function SectionHeader({
  title,
  description,
}: SectionHeaderPropsType) {
  return (
    <div className="section-header flex flex-col">
      {/* Title */}
      <h6 className="mb-2 text-start text-sm font-bold uppercase tracking-[.25rem] text-softPink-500 md:text-center md:text-base">
        {title}
      </h6>

      {/* Description */}
      <p className="relative w-fit text-start text-2xl font-bold text-maroon-700 before:absolute before:left-0 before:top-3/4 before:z-0 before:h-4 before:w-3/4 before:rounded-r-2xl before:bg-softPink-100 after:absolute after:-bottom-1 after:left-0 after:z-0 after:h-[2px] after:w-1/3 after:bg-softPink-600 md:text-center md:text-3xl lg:text-4xl">
        <span className="relative z-10">{description}</span>
      </p>
    </div>
  );
}
