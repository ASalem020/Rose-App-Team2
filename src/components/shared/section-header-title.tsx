type SectionHeaderTitlePropsType = {
  title: string;
};

export default function SectionHeaderTitle({
  title,
}: SectionHeaderTitlePropsType) {
  return (
    <h6 className="mb-2 text-start text-sm font-bold uppercase tracking-[.25rem] text-softPink-500 md:text-center md:text-base">
      {title}
    </h6>
  );
}
