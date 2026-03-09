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
    <div
      className="bg-white p-6"
      style={{ border: '1px solid #e0e5ea', borderRadius: '12px' }}
    >
      {/* Section Header with Step Number */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-7 w-7 items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: '#0068ef', borderRadius: '50%' }}
        >
          3
        </span>
        <h2 className="text-lg font-bold" style={{ color: '#001833' }}>
          Payment Details
        </h2>
      </div>

      <div className="space-y-3">
        {methods.map((method) => (
          <div key={method.id}>
            <button
              type="button"
              onClick={() => onSelect(method.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{
                border: `2px solid ${selected === method.id ? '#0068ef' : '#e0e5ea'}`,
                borderRadius: '10px',
                backgroundColor: selected === method.id ? '#e8f2ff' : '#ffffff',
              }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center text-sm font-bold"
                style={{
                  borderRadius: '8px',
                  backgroundColor: selected === method.id ? '#0068ef' : '#e0e5ea',
                  color: selected === method.id ? '#ffffff' : '#4f6f8f',
                }}
              >
                {method.id === "affirm" ? (
                  <svg viewBox="0 0 480 166" className="h-5 w-5" fill="currentColor">
                    <path d="M 138.9 120.3 L 138.9 47.7 L 162.6 47.7 L 162.6 120.3 Z M 150.8 10.3 C 143.4 10.3 137.7 16 137.7 23.3 C 137.7 30.6 143.4 36.3 150.8 36.3 C 158.1 36.3 163.8 30.6 163.8 23.3 C 163.8 16 158.1 10.3 150.8 10.3 Z" />
                  </svg>
                ) : (
                  method.icon
                )}
              </span>
              <span className="text-sm font-medium" style={{ color: '#001833' }}>{method.label}</span>
              {/* Radio indicator */}
              <span
                className="ml-auto h-5 w-5 flex items-center justify-center"
                style={{
                  border: `2px solid ${selected === method.id ? '#0068ef' : '#c0cad5'}`,
                  borderRadius: '50%',
                }}
              >
                {selected === method.id && (
                  <span
                    className="block h-2.5 w-2.5"
                    style={{ backgroundColor: '#0068ef', borderRadius: '50%' }}
                  />
                )}
              </span>
            </button>

            {/* Inline content for each payment method */}
            {selected === method.id && method.id === "affirm" && (
              <div className="mt-3 ml-11 p-4" style={{ border: '1px solid #99c3f9', borderRadius: '8px', backgroundColor: '#e8f2ff' }}>
                <AffirmInlineCheckout
                  items={items}
                  shipping={shipping}
                  billing={billing}
                  totals={totals}
                />
              </div>
            )}

            {selected === method.id && method.id === "credit-card" && (
              <div className="mt-3 ml-11 p-4" style={{ border: '1px solid #e0e5ea', borderRadius: '8px', backgroundColor: '#f4f6f8' }}>
                <p className="text-sm italic" style={{ color: '#4f6f8f' }}>
                  Credit card form placeholder — this demo focuses on Affirm
                  embedded checkout.
                </p>
                <div className="mt-3 space-y-3">
                  <div className="h-10" style={{ borderRadius: '8px', backgroundColor: '#e0e5ea' }} />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10" style={{ borderRadius: '8px', backgroundColor: '#e0e5ea' }} />
                    <div className="h-10" style={{ borderRadius: '8px', backgroundColor: '#e0e5ea' }} />
                  </div>
                </div>
              </div>
            )}

            {selected === method.id && method.id === "paypal" && (
              <div className="mt-3 ml-11 p-4" style={{ border: '1px solid #e0e5ea', borderRadius: '8px', backgroundColor: '#f4f6f8' }}>
                <p className="text-sm italic" style={{ color: '#4f6f8f' }}>
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
