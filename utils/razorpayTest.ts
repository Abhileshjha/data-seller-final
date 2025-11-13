// Test utility to check if Razorpay is properly loaded
export const testRazorpayIntegration = () => {
  console.log("Testing Razorpay Integration...");
  
  if (typeof window !== 'undefined') {
    if (window.Razorpay) {
      console.log("✅ Razorpay SDK loaded successfully");
      return true;
    } else {
      console.error("❌ Razorpay SDK not found. Please check if the script is loaded.");
      return false;
    }
  } else {
    console.warn("⚠️ Window object not available (SSR environment)");
    return false;
  }
};

// Call this in browser console to test
if (typeof window !== 'undefined') {
  (window as any).testRazorpay = testRazorpayIntegration;
}