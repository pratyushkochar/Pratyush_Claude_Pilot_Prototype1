"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { sampleCartItems, calculateTotals } from "@/lib/sample-data";
import { formatCents } from "@/lib/affirm";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const checkoutToken = searchParams.get("checkout_token");
  const totals = calculateTotals(sampleCartItems);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-bold tracking-tight">TechShop</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="mb-2 text-2xl font-bold">Order Confirmed!</h2>
          <p className="mb-6 text-gray-600">
            Your Affirm payment has been successfully processed.
          </p>

          {checkoutToken && (
            <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
              <p className="mb-1 text-sm font-medium text-gray-500">
                Checkout Token
              </p>
              <p className="break-all font-mono text-sm">{checkoutToken}</p>
            </div>
          )}

          <div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
            <p className="mb-2 text-sm font-medium text-gray-500">
              Order Total
            </p>
            <p className="text-2xl font-bold">{formatCents(totals.total)}</p>
            <p className="mt-1 text-sm text-gray-500">
              {sampleCartItems.length} items
            </p>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-left text-sm text-blue-800">
            <p className="font-medium">Demo Note</p>
            <p className="mt-1">
              In production, you would authorize the checkout token server-side
              via{" "}
              <code className="rounded bg-blue-100 px-1">
                POST /api/v1/transactions
              </code>{" "}
              to complete the charge.
            </p>
          </div>

          <a
            href="/checkout"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Back to Checkout
          </a>
        </div>
      </main>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
