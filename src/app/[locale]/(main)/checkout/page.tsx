import StepsProgress from './_components/steps-progress';

export default function Page() {
  return (
    <div className="checkout-page">
      <div className="container mx-auto mt-16 px-5">
        {/* Steps Progress */}
        <StepsProgress currentStep={1} />
      </div>
    </div>
  );
}
