import { CartItem, Address, OrderTotals, TravelDetails } from "./types";

export const sampleTravelDetails: TravelDetails = {
  hotelName: "The Westin St. Francis San Francisco on Union Square",
  hotelAddress: "335 Powell St, San Francisco, CA 94102",
  starRating: 4,
  checkIn: "Sat, Mar 15",
  checkOut: "Tue, Mar 18",
  nights: 3,
  rooms: 1,
  guests: 2,
  roomType: "Traditional Room, 1 King Bed",
  ratePerNight: 18900, // $189.00
  taxesAndFees: 6804, // $68.04
  resortFee: 10500, // $105.00 ($35/night × 3)
  imageUrl: "https://placehold.co/400x250/1a3c5e/ffffff?text=Hotel+Photo",
  freeCancellation: true,
};

export const sampleCartItems: CartItem[] = [
  {
    display_name: sampleTravelDetails.hotelName,
    sku: "HOTEL-WSF-001",
    unit_price: sampleTravelDetails.ratePerNight,
    qty: sampleTravelDetails.nights,
    item_image_url: sampleTravelDetails.imageUrl,
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
  const shipping = 0; // No shipping for hotel bookings
  const tax = sampleTravelDetails.taxesAndFees + sampleTravelDetails.resortFee;
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}
