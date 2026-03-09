"use client";

import { CartItem, OrderTotals } from "@/lib/types";
import { sampleTravelDetails } from "@/lib/sample-data";
import { formatCents } from "@/lib/affirm";

interface OrderSummaryProps {
  items: CartItem[];
  totals: OrderTotals;
}

export default function OrderSummary({ totals }: OrderSummaryProps) {
  const travel = sampleTravelDetails;

  return (
    <div
      className="bg-white overflow-hidden"
      style={{ border: '1px solid #e0e5ea', borderRadius: '12px' }}
    >
      {/* Hotel Image */}
      <div className="relative">
        <img
          src={travel.imageUrl}
          alt={travel.hotelName}
          className="h-44 w-full object-cover"
        />
        {travel.freeCancellation && (
          <span
            className="absolute bottom-3 left-3 px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: '#ecf7ec', color: '#008000', borderRadius: '9999px' }}
          >
            Free Cancellation
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Hotel Info */}
        <h3 className="text-base font-bold leading-snug" style={{ color: '#001833' }}>
          {travel.hotelName}
        </h3>
        <div className="mt-1 flex items-center gap-1">
          {Array.from({ length: travel.starRating }).map((_, i) => (
            <svg key={i} className="h-3.5 w-3.5" style={{ color: '#fedc2a' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-xs" style={{ color: '#4f6f8f' }}>Hotel</span>
        </div>
        <p className="mt-1 text-xs" style={{ color: '#4f6f8f' }}>
          {travel.hotelAddress}
        </p>

        {/* Divider */}
        <hr className="my-4" style={{ borderColor: '#e0e5ea' }} />

        {/* Stay Details */}
        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span style={{ color: '#4f6f8f' }}>Check-in</span>
            <span className="font-medium" style={{ color: '#001833' }}>{travel.checkIn}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#4f6f8f' }}>Check-out</span>
            <span className="font-medium" style={{ color: '#001833' }}>{travel.checkOut}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#4f6f8f' }}>Duration</span>
            <span className="font-medium" style={{ color: '#001833' }}>{travel.nights} nights</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#4f6f8f' }}>Room</span>
            <span className="font-medium text-right text-xs" style={{ color: '#001833', maxWidth: '60%' }}>{travel.roomType}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#4f6f8f' }}>Guests</span>
            <span className="font-medium" style={{ color: '#001833' }}>{travel.guests} Adults</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4" style={{ borderColor: '#e0e5ea' }} />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: '#4f6f8f' }}>
              {formatCents(travel.ratePerNight)}/night × {travel.nights} nights
            </span>
            <span style={{ color: '#001833' }}>{formatCents(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: '#4f6f8f' }}>Taxes & Fees</span>
            <span style={{ color: '#001833' }}>{formatCents(travel.taxesAndFees)}</span>
          </div>
          {travel.resortFee > 0 && (
            <div className="flex justify-between">
              <span style={{ color: '#4f6f8f' }}>Resort Fee</span>
              <span style={{ color: '#001833' }}>{formatCents(travel.resortFee)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div
          className="mt-4 flex justify-between pt-4 text-base"
          style={{ borderTop: '2px solid #001833' }}
        >
          <span className="font-bold" style={{ color: '#001833' }}>Total</span>
          <span className="font-bold" style={{ color: '#0068ef', fontSize: '1.125rem' }}>
            {formatCents(totals.total)}
          </span>
        </div>

        {/* Trust Badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 pt-3" style={{ borderTop: '1px solid #e0e5ea' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#4f6f8f' }}>
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs" style={{ color: '#4f6f8f' }}>Secure Booking — SSL Encrypted</span>
        </div>
      </div>
    </div>
  );
}
