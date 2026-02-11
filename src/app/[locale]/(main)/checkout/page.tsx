import AddAddress from './_components/add-address';
import Addresses from './_components/addresses';
import StepsProgress from './_components/steps-progress';

export default function Page() {
  return (
    <div className="checkout-page mb-16">
      <div className="container mx-auto mt-16 px-5">
        {/* Steps Progress */}
        <StepsProgress currentStep={1} />

        {/* Shipping Addresses */}
        {/* Title */}
        <h3 className="mb-6 text-2xl font-semibold md:text-3xl">
          Shipping Addresses
        </h3>

        {/* Addresses */}
        <Addresses />

        {/* Add Address */}
        <AddAddress />
      </div>
    </div>
  );
}
