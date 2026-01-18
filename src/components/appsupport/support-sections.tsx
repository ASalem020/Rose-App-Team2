import { SupportData } from "./support-Items";
import SupportInfo from "./support-List";

export default function SupportSection() {
  return (
    <section className="w-full bg-maroon-50 py-6 mx-auto">
      <div className="mx-auto grid max-w-[1200px] grid-cols-4 gap-6  ">
        {/* section data map */}
        {SupportData.map((item) => (
          <SupportInfo
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
