"use client";

import { CartItem, Address, OrderTotals } from "@/lib/types";
import AffirmInlineCheckout from "./AffirmInlineCheckout";

type PaymentMethod = "credit-card" | "affirm" | "paypal";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  items: CartItem[];
  shipping: Address;
  billing: Address;
  totals: OrderTotals;
}

const methods: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "credit-card", label: "Credit Card", icon: "💳" },
  { id: "affirm", label: "Affirm", icon: "A" },
  { id: "paypal", label: "PayPal", icon: "PP" },
];

export default function PaymentMethodSelector({
  selected,
  onSelect,
  items,
  shipping,
  billing,
  totals,
}: PaymentMethodSelectorProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>

      <div className="space-y-3">
        {methods.map((method) => (
          <div key={method.id}>
            <button
              type="button"
              onClick={() => onSelect(method.id)}
              className={`flex w-full items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                selected === method.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${
                  selected === method.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {method.id === "affirm" ? (
                  <svg viewBox="0 0 480 166" className="h-5 w-5" fill="currentColor">
                    <path d="M 138.9 120.3 L 138.9 47.7 L 162.6 47.7 L 162.6 120.3 Z M 150.8 10.3 C 143.4 10.3 137.7 16 137.7 23.3 C 137.7 30.6 143.4 36.3 150.8 36.3 C 158.1 36.3 163.8 30.6 163.8 23.3 C 163.8 16 158.1 10.3 150.8 10.3 Z" />
                  </svg>
                ) : (
                  method.icon
                )}
              </span>
              <span className="text-sm font-medium">{method.label}</span>
              <span
                className={`ml-auto h-4 w-4 rounded-full border-2 ${
                  selected === method.id
                    ? "border-blue-600 bg-blue-600 shadow-[inset_0_0_0_2px_white]"
                    : "border-gray-300"
                }`}
              />
            </button>

            {/* Inline content for each payment method */}
            {selected === method.id && method.id === "affirm" && (
              <div className="mt-3 ml-11 rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                <AffirmInlineCheckout
                  items={items}
                  shipping={shipping}
                  billing={billing}
                  totals={totals}
                />
              </div>
            )}

            {selected === method.id && method.id === "credit-card" && (
              <div className="mt-3 ml-11 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-sm text-gray-500 italic">
                  Credit card form placeholder — this demo focuses on Affirm
                  embedded checkout.
                </p>
                <div className="mt-3 space-y-3">
                  <div className="h-10 rounded-lg bg-gray-200" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 rounded-lg bg-gray-200" />
                    <div className="h-10 rounded-lg bg-gray-200" />
                  </div>
                </div>
              </div>
            )}

            {selected === method.id && method.id === "paypal" && (
              <div className="mt-3 ml-11 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-sm text-gray-500 italic">
                  PayPal checkout placeholder — this demo focuses on Affirm
                  embedded checkout.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export type { PaymentMethod };
