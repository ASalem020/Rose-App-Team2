import { SupportData } from "./supportdata";
import SupportInfo from "./supportmap";

export default function SupportSection() {
  return (
    <section className="w-full bg-maroon-50 py-6 mx-auto">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-4">
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
