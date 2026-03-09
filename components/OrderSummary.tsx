"use client";

import { CartItem, OrderTotals } from "@/lib/types";
import { formatCents } from "@/lib/affirm";

interface OrderSummaryProps {
  items: CartItem[];
  totals: OrderTotals;
}

export default function OrderSummary({ items, totals }: OrderSummaryProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.sku} className="flex gap-4 py-4 first:pt-0">
            <img
              src={item.item_image_url}
              alt={item.display_name}
              className="h-16 w-16 rounded-lg bg-gray-100 object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {item.display_name}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
            <p className="text-sm font-medium whitespace-nowrap">
              {formatCents(item.unit_price * item.qty)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>{formatCents(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span>{formatCents(totals.shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tax</span>
          <span>{formatCents(totals.tax)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold">
          <span>Total</span>
          <span>{formatCents(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}
