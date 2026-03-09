import { CartItem, Address, OrderTotals } from "./types";

export function buildCheckoutObject(
  items: CartItem[],
  shipping: Address,
  billing: Address,
  totals: OrderTotals
): Record<string, unknown> {
  return {
    merchant: {
      user_confirmation_url: `${typeof window !== "undefined" ? window.location.origin : ""}/confirm`,
      user_cancel_url: `${typeof window !== "undefined" ? window.location.origin : ""}/checkout`,
      user_confirmation_url_action: "GET",
      name: "TechShop Demo",
    },
    shipping: {
      name: { first: shipping.firstName, last: shipping.lastName },
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        state: shipping.state,
        zipcode: shipping.zipcode,
        country: shipping.country,
      },
      phone_number: shipping.phone,
      email: shipping.email,
    },
    billing: {
      name: { first: billing.firstName, last: billing.lastName },
      address: {
        line1: billing.line1,
        line2: billing.line2,
        city: billing.city,
        state: billing.state,
        zipcode: billing.zipcode,
        country: billing.country,
      },
      phone_number: billing.phone,
      email: billing.email,
    },
    items: items.map((item) => ({
      display_name: item.display_name,
      sku: item.sku,
      unit_price: item.unit_price,
      qty: item.qty,
      item_image_url: item.item_image_url,
      item_url: item.item_url,
    })),
    metadata: {
      mode: "modal",
    },
    order_id: `DEMO-${Date.now()}`,
    shipping_amount: totals.shipping,
    tax_amount: totals.tax,
    total: totals.total,
  };
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
