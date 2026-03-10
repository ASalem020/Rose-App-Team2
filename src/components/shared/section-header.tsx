import SectionHeaderDescription from './section-header-description';
import SectionHeaderTitle from './section-header-title';

type SectionHeaderPropsType = {
  title: string;
  description: string;
};

export default function SectionHeader({
  title,
  description,
}: SectionHeaderPropsType) {
  return (
    <div className="section-header mb-10 flex flex-col">
      {/* Title */}
      <SectionHeaderTitle title={title} />

      {/* Description */}
      <SectionHeaderDescription description={description} />
    </div>
  );
}
