"use client";

import { CartItem, Address, OrderTotals } from "@/lib/types";
import AffirmEmbeddedCheckout from "./AffirmInlineCheckout";

type PaymentMethod = "credit-card" | "affirm" | "paypal";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  items: CartItem[];
  shipping: Address;
  billing: Address;
  totals: OrderTotals;
}

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
      <div className="mb-1 flex items-center gap-3">
        <span
          className="flex h-7 w-7 items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: '#0068ef', borderRadius: '50%' }}
        >
          3
        </span>
        <h2 className="text-lg font-bold" style={{ color: '#001833' }}>
          Payment
        </h2>
      </div>
      <p className="mb-5 ml-10 text-xs" style={{ color: '#4f6f8f' }}>
        Your payment info is encrypted.
      </p>

      <div className="space-y-0">
        {/* Cards option */}
        <button
          type="button"
          onClick={() => onSelect("credit-card")}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors"
          style={{
            borderTop: '1px solid #e0e5ea',
            borderLeft: '1px solid #e0e5ea',
            borderRight: '1px solid #e0e5ea',
            borderBottom: 'none',
            borderRadius: '10px 10px 0 0',
            backgroundColor: selected === "credit-card" ? '#e8f2ff' : '#ffffff',
          }}
        >
          {/* Radio */}
          <span
            className="h-5 w-5 flex items-center justify-center flex-shrink-0"
            style={{
              border: `2px solid ${selected === "credit-card" ? '#0068ef' : '#c0cad5'}`,
              borderRadius: '50%',
            }}
          >
            {selected === "credit-card" && (
              <span className="block h-2.5 w-2.5" style={{ backgroundColor: '#0068ef', borderRadius: '50%' }} />
            )}
          </span>
          <span className="text-sm font-medium" style={{ color: '#001833' }}>Cards</span>
        </button>

        {/* Cards expanded content */}
        {selected === "credit-card" && (
          <div className="px-4 pb-4 pt-1" style={{ borderLeft: '1px solid #e0e5ea', borderRight: '1px solid #e0e5ea', backgroundColor: '#f4f6f8' }}>
            <p className="text-sm italic" style={{ color: '#4f6f8f' }}>
              Credit card form placeholder — this demo focuses on Affirm embedded checkout.
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

        {/* PayPal option */}
        <button
          type="button"
          onClick={() => onSelect("paypal")}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors"
          style={{
            borderTop: '1px solid #e0e5ea',
            borderLeft: '1px solid #e0e5ea',
            borderRight: '1px solid #e0e5ea',
            borderBottom: 'none',
            backgroundColor: selected === "paypal" ? '#e8f2ff' : '#ffffff',
          }}
        >
          <span
            className="h-5 w-5 flex items-center justify-center flex-shrink-0"
            style={{
              border: `2px solid ${selected === "paypal" ? '#0068ef' : '#c0cad5'}`,
              borderRadius: '50%',
            }}
          >
            {selected === "paypal" && (
              <span className="block h-2.5 w-2.5" style={{ backgroundColor: '#0068ef', borderRadius: '50%' }} />
            )}
          </span>
          <span className="text-sm font-bold" style={{ color: '#003087' }}>P</span>
          <span className="text-sm font-bold -ml-2" style={{ color: '#009cde' }}>PayPal</span>
        </button>

        {/* PayPal expanded content */}
        {selected === "paypal" && (
          <div className="px-4 pb-4 pt-1" style={{ borderLeft: '1px solid #e0e5ea', borderRight: '1px solid #e0e5ea', backgroundColor: '#f4f6f8' }}>
            <p className="text-sm italic" style={{ color: '#4f6f8f' }}>
              PayPal checkout placeholder — this demo focuses on Affirm embedded checkout.
            </p>
          </div>
        )}

        {/* Affirm option */}
        <button
          type="button"
          onClick={() => onSelect("affirm")}
          className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors"
          style={{
            border: selected === "affirm" ? '2px solid #0068ef' : '1px solid #e0e5ea',
            borderRadius: '0 0 10px 10px',
            backgroundColor: selected === "affirm" ? '#e8f2ff' : '#ffffff',
          }}
        >
          <span
            className="h-5 w-5 flex items-center justify-center flex-shrink-0"
            style={{
              border: `2px solid ${selected === "affirm" ? '#0068ef' : '#c0cad5'}`,
              borderRadius: '50%',
            }}
          >
            {selected === "affirm" && (
              <span className="block h-2.5 w-2.5" style={{ backgroundColor: '#0068ef', borderRadius: '50%' }} />
            )}
          </span>
          {/* Affirm wordmark */}
          <span className="text-sm font-bold" style={{ color: '#001833' }}>
            affirm
          </span>
          <span className="text-xs" style={{ color: '#4f6f8f' }}>
            No fees. As low as 0% APR
          </span>
        </button>

        {/* Affirm embedded checkout content */}
        {selected === "affirm" && (
          <div
            className="mt-3 p-4"
            style={{ border: '1px solid #e0e5ea', borderRadius: '8px', backgroundColor: '#ffffff' }}
          >
            <AffirmEmbeddedCheckout
              items={items}
              shipping={shipping}
              billing={billing}
              totals={totals}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export type { PaymentMethod };
