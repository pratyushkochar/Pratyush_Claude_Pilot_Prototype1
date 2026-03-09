"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { sampleCartItems, sampleTravelDetails, calculateTotals } from "@/lib/sample-data";
import { formatCents } from "@/lib/affirm";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const checkoutToken = searchParams.get("checkout_token");
  const totals = calculateTotals(sampleCartItems);
  const travel = sampleTravelDetails;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f6f8' }}>
      <header style={{ backgroundColor: '#001833' }}>
        <div className="mx-auto max-w-6xl px-4 py-3">
          <h1 className="text-xl font-bold tracking-tight text-white">TravelShop</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="bg-white p-8" style={{ border: '1px solid #e0e5ea', borderRadius: '12px' }}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center" style={{ backgroundColor: '#ecf7ec', borderRadius: '50%' }}>
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: '#008000' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="mb-2 text-2xl font-bold" style={{ color: '#001833' }}>Booking Confirmed!</h2>
          <p className="mb-6 text-sm" style={{ color: '#4f6f8f' }}>
            Your stay at {travel.hotelName} has been booked with Affirm.
          </p>

          {/* Stay Summary */}
          <div className="mb-6 p-4 text-left" style={{ backgroundColor: '#f4f6f8', borderRadius: '8px' }}>
            <p className="text-sm font-bold" style={{ color: '#001833' }}>{travel.hotelName}</p>
            <p className="mt-1 text-xs" style={{ color: '#4f6f8f' }}>
              {travel.checkIn} — {travel.checkOut} · {travel.nights} nights · {travel.guests} guests
            </p>
            <p className="mt-3 text-2xl font-bold" style={{ color: '#0068ef' }}>{formatCents(totals.total)}</p>
          </div>

          {checkoutToken && (
            <div className="mb-6 p-4 text-left" style={{ backgroundColor: '#f4f6f8', borderRadius: '8px' }}>
              <p className="mb-1 text-sm font-medium" style={{ color: '#4f6f8f' }}>
                Checkout Token
              </p>
              <p className="break-all font-mono text-sm" style={{ color: '#001833' }}>{checkoutToken}</p>
            </div>
          )}

          <div className="p-4 text-left text-sm" style={{ backgroundColor: '#e8f2ff', borderRadius: '8px', border: '1px solid #99c3f9', color: '#001833' }}>
            <p className="font-medium">Demo Note</p>
            <p className="mt-1" style={{ color: '#4f6f8f' }}>
              In production, you would authorize the checkout token server-side
              via{" "}
              <code className="px-1" style={{ backgroundColor: '#d0e4ff', borderRadius: '4px' }}>
                POST /api/v1/transactions
              </code>{" "}
              to complete the charge.
            </p>
          </div>

          <a
            href="/checkout"
            className="mt-6 inline-block px-8 py-3 text-sm font-bold text-white transition-colors"
            style={{ backgroundColor: '#0068ef', borderRadius: '9999px' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#0055c4')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#0068ef')}
          >
            Book Another Stay
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
          <p style={{ color: '#4f6f8f' }}>Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
