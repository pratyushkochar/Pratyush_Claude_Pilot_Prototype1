import { CartItem, Address, OrderTotals } from "./types";

export const sampleCartItems: CartItem[] = [
  {
    display_name: "Wireless Noise-Cancelling Headphones",
    sku: "WH-1000XM5",
    unit_price: 34999,
    qty: 1,
    item_image_url: "https://placehold.co/120x120/e2e8f0/475569?text=Headphones",
    item_url: "#",
  },
  {
    display_name: "Premium Phone Case",
    sku: "PC-ULTRA-BLK",
    unit_price: 4999,
    qty: 2,
    item_image_url: "https://placehold.co/120x120/e2e8f0/475569?text=Case",
    item_url: "#",
  },
  {
    display_name: "USB-C Fast Charger",
    sku: "CHG-65W",
    unit_price: 2999,
    qty: 1,
    item_image_url: "https://placehold.co/120x120/e2e8f0/475569?text=Charger",
    item_url: "#",
  },
];

export const sampleShipping: Address = {
  firstName: "Jane",
  lastName: "Smith",
  line1: "633 Folsom St",
  line2: "Floor 7",
  city: "San Francisco",
  state: "CA",
  zipcode: "94107",
  country: "US",
  phone: "4155551234",
  email: "jane.smith@example.com",
};

export const sampleBilling: Address = { ...sampleShipping };

export function calculateTotals(items: CartItem[]): OrderTotals {
  const subtotal = items.reduce(
    (sum, item) => sum + item.unit_price * item.qty,
    0
  );
  const shipping = 999; // $9.99
  const tax = Math.round(subtotal * 0.0875); // 8.75% tax
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}
