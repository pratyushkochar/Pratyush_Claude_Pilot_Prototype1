"use client";

import { useEffect, useRef, useState } from "react";
import { CartItem, Address, OrderTotals } from "@/lib/types";
import { buildCheckoutObject } from "@/lib/affirm";

interface AffirmEmbeddedCheckoutProps {
  items: CartItem[];
  shipping: Address;
  billing: Address;
  totals: OrderTotals;
}

export default function AffirmEmbeddedCheckout({
  items,
  shipping,
  billing,
  totals,
}: AffirmEmbeddedCheckoutProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;

    const initAffirm = () => {
      try {
        if (!window.affirm) {
          setStatus("error");
          return;
        }

        const checkoutObj = buildCheckoutObject(
          items,
          shipping,
          billing,
          totals
        );

        // Set checkout data — affirm.js auto-detects elements with
        // class="affirm-embedded-checkout" and renders into them.
        window.affirm.checkout(checkoutObj);

        initializedRef.current = true;
        setStatus("ready");
      } catch (err) {
        console.error("Affirm embedded checkout error:", err);
        setStatus("error");
      }
    };

    // Wait for Affirm.js to be ready
    if (window.affirm?.ui?.ready) {
      window.affirm.ui.ready(initAffirm);
    } else {
      // Fallback: poll for affirm to be available
      const interval = setInterval(() => {
        if (window.affirm?.ui?.ready) {
          clearInterval(interval);
          window.affirm.ui.ready(initAffirm);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [items, shipping, billing, totals]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs" style={{ color: '#4f6f8f' }}>
        <svg
          className="h-4 w-4"
          style={{ color: '#0068ef' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          Sandbox mode — use any phone number with PIN{" "}
          <strong style={{ color: '#001833' }}>1234</strong> to test.
        </span>
      </div>

      {status === "loading" && (
        <div
          className="flex items-center justify-center py-12"
          style={{ border: '1px dashed #c0cad5', borderRadius: '8px', backgroundColor: '#f4f6f8' }}
        >
          <div className="text-center">
            <div
              className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
              style={{ borderColor: '#0068ef', borderTopColor: 'transparent' }}
            />
            <p className="text-sm" style={{ color: '#4f6f8f' }}>
              Loading Affirm checkout...
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          className="p-4 text-sm"
          style={{ borderRadius: '8px', border: '1px solid #eb9999', backgroundColor: '#fbebeb', color: '#c00' }}
        >
          <p className="font-medium">Unable to load Affirm checkout</p>
          <p className="mt-1" style={{ color: '#800' }}>
            Please ensure you have configured a valid Affirm sandbox public API
            key in your <code className="px-1" style={{ backgroundColor: '#fde', borderRadius: '4px' }}>.env.local</code>{" "}
            file.
          </p>
        </div>
      )}

      {/* Affirm Embedded Checkout — affirm.js renders into this element */}
      <p className="affirm-embedded-checkout"></p>

      {/* Affirm Confirmation Button — affirm.js renders into this element */}
      <div className="affirm-checkout-confirmation-button"></div>
    </div>
  );
}
