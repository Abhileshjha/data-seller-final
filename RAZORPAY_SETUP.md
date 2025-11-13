# Razorpay Integration Setup Guide

## Overview
This project now includes Razorpay payment gateway integration for secure payment processing. Follow the steps below to configure and use the payment system.

## Prerequisites
1. A Razorpay account (sign up at https://razorpay.com/)
2. Razorpay API keys (Key ID and Key Secret)

## Setup Instructions

### 1. Get Razorpay API Keys
1. Login to your Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Generate API Keys or use existing ones
4. Copy the **Key ID** (starts with `rzp_test_` for test mode or `rzp_live_` for live mode)

### 2. Configure Razorpay Keys
1. Open `config/razorpay.ts`
2. Replace the test key with your actual Razorpay Key ID:
   ```typescript
   export const RAZORPAY_CONFIG = {
     key: "rzp_test_YOUR_ACTUAL_KEY_HERE", // Replace with your key
     currency: "INR",
     name: "Data Seller Pro",
     description: "Premium Marketing Data Purchase",
     theme: {
       color: "#4F46E5"
     }
   };
   ```

### 3. Test Mode vs Live Mode
- **Test Mode**: Use keys starting with `rzp_test_`
- **Live Mode**: Use keys starting with `rzp_live_`

**Important**: Always use test mode during development!

### 4. Payment Flow
1. Customer clicks "Buy Now" on any product
2. Payment modal opens with customer detail form
3. Customer fills in Name, Email, and Phone Number
4. Customer clicks "Pay with Razorpay"
5. Razorpay checkout opens with payment options:
   - Credit/Debit Cards
   - UPI (PhonePe, Google Pay, Paytm, etc.)
   - Net Banking
   - Wallets
6. After successful payment, customer is redirected to thank you page

### 5. Payment Security Features
- All payments are processed securely by Razorpay
- No sensitive payment data is stored on your server
- PCI DSS compliant payment processing
- Automatic fraud detection and prevention

### 6. Testing Payments

#### Test Card Numbers (Razorpay Test Mode):
- **Success**: 4111111111111111
- **Failure**: 4000000000000002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

#### Test UPI ID:
- **Success**: success@razorpay
- **Failure**: failure@razorpay

### 7. Webhook Setup (Optional - for production)
For production environments, set up webhooks to handle payment confirmations:

1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events: `payment.captured`, `payment.failed`
4. Add webhook secret for security

### 8. Environment Variables (Recommended)
For better security, store Razorpay keys in environment variables:

1. Create `.env` file in project root:
   ```
   VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here
   ```

2. Update `config/razorpay.ts`:
   ```typescript
   export const RAZORPAY_CONFIG = {
     key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_fallback_key",
     // ... rest of config
   };
   ```

### 9. Payment Data Storage
Currently, payment details are stored in localStorage for demo purposes. In production:
- Send payment details to your backend API
- Store in secure database
- Implement proper order management
- Send confirmation emails

### 10. Customization Options
You can customize the payment experience by modifying:
- Company name and description in `config/razorpay.ts`
- Theme colors to match your brand
- Customer information fields in PaymentModal
- Success/failure handling logic

## Important Notes
- **Never expose your Razorpay Key Secret** in frontend code
- Always validate payments on your backend using Razorpay webhooks
- Use HTTPS in production for secure payment processing
- Test thoroughly in test mode before going live

## Support
- Razorpay Documentation: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/

## Current Features
✅ Secure Razorpay checkout integration  
✅ Support for all major payment methods  
✅ Mobile-responsive payment flow  
✅ Customer information collection  
✅ Payment success/failure handling  
✅ Local storage of payment details (demo)  

## Production Checklist
- [ ] Replace test keys with live keys
- [ ] Set up webhook endpoints
- [ ] Implement backend payment verification
- [ ] Add proper error handling
- [ ] Set up order management system
- [ ] Configure email notifications
- [ ] Add payment receipt generation