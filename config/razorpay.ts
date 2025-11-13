// Razorpay Configuration - LIVE MODE
export const RAZORPAY_CONFIG = {
  // Live Razorpay Key ID
  key: "rzp_live_RbD4vjANuXjIwN",
  // Key Secret (use on backend only, not exposed to frontend)
  keySecret: "K62It6qAmYPfVfGAM6zIxpZT",
  currency: "INR",
  name: "Data Seller Pro",
  description: "Premium Marketing Data Purchase",
  image: "/logo.png", // Optional: Add your logo
  theme: {
    color: "#4F46E5" // Brand blue color
  }
};

// Razorpay payment handler types
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

// Declare Razorpay for TypeScript
declare global {
  interface Window {
    Razorpay: any;
  }
}