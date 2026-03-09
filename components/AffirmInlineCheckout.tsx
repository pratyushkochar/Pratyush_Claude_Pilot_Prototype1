"use client";

import { useEffect, useRef, useState } from "react";
import { CartItem, Address, OrderTotals } from "@/lib/types";
import { buildCheckoutObject } from "@/lib/affirm";

interface AffirmInlineCheckoutProps {
  items: CartItem[];
  shipping: Address;
  billing: Address;
  totals: OrderTotals;
}

export default function AffirmInlineCheckout({
  items,
  shipping,
  billing,
  totals,
}: AffirmInlineCheckoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

        window.affirm.checkout(checkoutObj);
        window.affirm.checkout.inline({
          merchant: {
            inline_container: "affirm-inline-checkout-container",
          },
        });

        initializedRef.current = true;
        setStatus("ready");
      } catch (err) {
        console.error("Affirm inline checkout error:", err);
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
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg
          className="h-5 w-5 text-blue-600"
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
          Select a payment plan below. Use any phone number with PIN{" "}
          <strong>1234</strong> in sandbox mode.
        </span>
      </div>

      {status === "loading" && (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-12">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-sm text-gray-500">
              Loading Affirm checkout...
            </p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-medium">Unable to load Affirm checkout</p>
          <p className="mt-1">
            Please ensure you have configured a valid Affirm sandbox public API
            key in your <code className="rounded bg-red-100 px-1">.env.local</code>{" "}
            file.
          </p>
        </div>
      )}

      <div
        ref={containerRef}
        id="affirm-inline-checkout-container"
        className="min-h-[100px]"
      />
    </div>
  );
}
