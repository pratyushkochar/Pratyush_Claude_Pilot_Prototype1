"use client";

import { useState } from "react";
import { Address } from "@/lib/types";
import {
  sampleCartItems,
  sampleShipping,
  sampleBilling,
  sampleTravelDetails,
  calculateTotals,
} from "@/lib/sample-data";
import OrderSummary from "@/components/OrderSummary";
import ShippingForm from "@/components/ShippingForm";
import BillingForm from "@/components/BillingForm";
import PaymentMethodSelector, {
  type PaymentMethod,
} from "@/components/PaymentMethodSelector";

export default function CheckoutPage() {
  const [shipping, setShipping] = useState<Address>(sampleShipping);
  const [billing, setBilling] = useState<Address>(sampleBilling);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("affirm");

  const items = sampleCartItems;
  const totals = calculateTotals(items);

  const effectiveBilling = sameAsShipping ? shipping : billing;

  const handleSameAsShipping = (same: boolean) => {
    setSameAsShipping(same);
    if (same) {
      setBilling({ ...shipping });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f6f8' }}>
      {/* Header — Dark Navy Bar */}
      <header style={{ backgroundColor: '#001833' }}>
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-white">
                TravelShop
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs text-white/70">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure Booking
              </span>
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white/60" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                Sandbox
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 py-3">
        <nav className="flex items-center gap-2 text-xs" style={{ color: '#4f6f8f' }}>
          <span className="hover:underline cursor-pointer" style={{ color: '#0068ef' }}>Hotels</span>
          <span>&gt;</span>
          <span className="hover:underline cursor-pointer" style={{ color: '#0068ef' }}>San Francisco</span>
          <span>&gt;</span>
          <span>{sampleTravelDetails.hotelName.split(' ').slice(0, 4).join(' ')}...</span>
          <span>&gt;</span>
          <span className="font-medium" style={{ color: '#001833' }}>Checkout</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column: Forms */}
          <div className="space-y-5 lg:col-span-2">
            <ShippingForm address={shipping} onChange={setShipping} />

            <BillingForm
              address={effectiveBilling}
              onChange={setBilling}
              sameAsShipping={sameAsShipping}
              onSameAsShippingChange={handleSameAsShipping}
            />

            <PaymentMethodSelector
              selected={paymentMethod}
              onSelect={setPaymentMethod}
              items={items}
              shipping={shipping}
              billing={effectiveBilling}
              totals={totals}
            />

            {/* Complete Booking Button */}
            <button
              type="button"
              className="w-full px-6 py-3.5 text-base font-bold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              style={{
                backgroundColor: '#0068ef',
                borderRadius: '9999px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0055c4')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0068ef')}
              disabled={paymentMethod !== "affirm"}
              onClick={() => {
                if (paymentMethod === "affirm" && window.affirm) {
                  window.affirm.checkout.open({
                    onSuccess: (result) => {
                      window.location.href = `/confirm?checkout_token=${result.checkout_token}`;
                    },
                    onFail: (error) => {
                      console.error("Affirm checkout failed:", error);
                      alert(
                        "Checkout was cancelled or failed. Please try again."
                      );
                    },
                  });
                }
              }}
            >
              {paymentMethod === "affirm"
                ? "Complete Booking with Affirm"
                : "Complete Booking"}
            </button>

            {/* Trust text */}
            <p className="text-center text-xs" style={{ color: '#4f6f8f' }}>
              By completing this booking, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <OrderSummary items={items} totals={totals} />
          </div>
        </div>
      </main>
    </div>
  );
}
