export interface CartItem {
  display_name: string;
  sku: string;
  unit_price: number; // cents
  qty: number;
  item_image_url: string;
  item_url: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
  email: string;
}

export interface OrderTotals {
  subtotal: number; // cents
  shipping: number;
  tax: number;
  total: number;
}

export interface TravelDetails {
  hotelName: string;
  hotelAddress: string;
  starRating: number;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  guests: number;
  roomType: string;
  ratePerNight: number; // cents
  taxesAndFees: number; // cents
  resortFee: number; // cents
  imageUrl: string;
  freeCancellation: boolean;
}

// Affirm global types
declare global {
  interface Window {
    affirm: {
      checkout: {
        (data: Record<string, unknown>): void;
        open: (callbacks?: {
          onFail?: (error: unknown) => void;
          onSuccess?: (result: { checkout_token: string }) => void;
          onOpen?: () => void;
          onValidationError?: (error: unknown) => void;
        }) => void;
        inline: (config?: {
          merchant?: { inline_container?: string };
        }) => void;
        set: (data: Record<string, unknown>) => void;
      };
      ui: {
        ready: (callback: () => void) => void;
      };
    };
    _affirm_config: {
      public_api_key: string;
      script: string;
      locale?: string;
      country_code?: string;
    };
  }
}

export {};
