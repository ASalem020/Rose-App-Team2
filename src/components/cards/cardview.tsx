import { cardDetails } from "./cardsdata";
import CardMap from "./cardmap";

export default function OccasionsSection() {
  return (
    <section className="w-full flex justify-center py-10">
      <div className="grid w-full max-w-[1340px] grid-cols-1 gap-6 md:grid-cols-3">
        {cardDetails.map((item) => (
          <CardMap
            key={item.id}
            image={item.image}
            header={item.header}
            details={item.details}
          />
        ))}
      </div>
    </section>
  );
}
