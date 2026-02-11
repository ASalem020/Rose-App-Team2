import Addresses from './_components/addresses';
import StepsProgress from './_components/steps-progress';

export default function Page() {
  return (
    <div className="checkout-page mb-16">
      <div className="container mx-auto mt-16 px-5">
        {/* Steps Progress */}
        <StepsProgress currentStep={1} />

        {/* Addresses */}
        <Addresses />
      </div>
    </div>
  );
}
