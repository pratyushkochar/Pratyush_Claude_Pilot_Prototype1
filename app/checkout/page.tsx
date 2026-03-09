"use client";

import { useState } from "react";
import { Address } from "@/lib/types";
import {
  sampleCartItems,
  sampleShipping,
  sampleBilling,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">
              TechShop
            </h1>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Sandbox Demo
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">Checkout</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Forms */}
          <div className="space-y-6 lg:col-span-2">
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

            {/* Place Order Button */}
            <button
              type="button"
              className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
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
                ? "Complete with Affirm"
                : "Place Order"}
            </button>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <OrderSummary items={items} totals={totals} />
          </div>
        </div>
      </main>
    </div>
  );
}
