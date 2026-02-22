import CheckoutContent from './_components/checkout-content';
import PriceSummary from './_components/price-summary';

export default function Page() {
  return (
    <div className="checkout-page mb-16">
      <div className="container mx-auto mt-16 px-5">
        {/* CheckoutContent - Create this Component to prevent make route client side */}
        <CheckoutContent />
        <PriceSummary />
      </div>
    </div>
  );
}
