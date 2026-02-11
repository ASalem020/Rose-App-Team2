import AddressCard from './_components/address-card';
import StepsProgress from './_components/steps-progress';

export default function Page() {
  return (
    <div className="checkout-page">
      <div className="container mx-auto mt-16 px-5">
        {/* Steps Progress */}
        <StepsProgress currentStep={1} />

        {/* Shipping Addresses */}
        {/* Title */}
        <h3 className="mb-6 text-2xl font-semibold md:text-3xl">
          Shipping Addresses
        </h3>

        {/* Addresses */}
        <div className="addresses">
          <div className="container flex max-h-[20.9375rem] flex-col gap-3 overflow-y-auto">
            <AddressCard
              city="Cairo"
              address="14 Omar Ibn Akhatab St., Ramsis St., Cairo"
              phone="123-456-7890"
            />
            <AddressCard
              city="Cairo"
              address="14 Omar Ibn Akhatab St., Ramsis St., Cairo"
              phone="123-456-7890"
              selected
            />
            <AddressCard
              city="Cairo"
              address="14 Omar Ibn Akhatab St., Ramsis St., Cairo"
              phone="123-456-7890"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
