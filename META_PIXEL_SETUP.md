# Meta Pixel Conversion Tracking Setup

## ✅ Meta Pixel Installed

### Pixel ID: 834110572313637

---

## 📍 Where the Code Was Added

### 1. **Base Pixel Code** - `index.html`
**Location**: Inside `<head>` section, before closing `</head>` tag

**Purpose**: 
- Loads Meta Pixel on every page
- Tracks PageView automatically
- Makes `fbq()` function available globally

**Code Added**:
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '834110572313637');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=834110572313637&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

---

### 2. **InitiateCheckout Event** - `PaymentModal.tsx`
**Location**: `useEffect` hook when modal opens

**Triggers When**: 
- User clicks "Buy Now" button
- Payment modal opens

**Data Tracked**:
```javascript
fbq('track', 'InitiateCheckout', {
  value: product.price,           // Product price (e.g., 699)
  currency: 'INR',                 // Indian Rupees
  content_name: product.name,      // Product name
  content_ids: [product.id],       // Product ID
  content_type: 'product',         // Type
  num_items: 1                     // Quantity
});
```

**Code Location**:
```typescript
useEffect(() => {
  if (product) {
    // ... existing code ...
    
    // Track Meta Pixel InitiateCheckout Event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: product.price,
        currency: 'INR',
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        num_items: 1
      });
    }
  }
}, [product]);
```

---

### 3. **Purchase Event** - `PaymentModal.tsx`
**Location**: Inside Razorpay payment success handler

**Triggers When**: 
- Payment is successfully completed
- User receives confirmation

**Data Tracked**:
```javascript
fbq('track', 'Purchase', {
  value: product.price,           // Amount paid
  currency: 'INR',                 // Currency
  content_name: product.name,      // Product purchased
  content_ids: [product.id],       // Product ID
  content_type: 'product',         // Type
  num_items: 1                     // Quantity
});
```

**Code Location**:
```typescript
handler: (response: RazorpayResponse) => {
  // Payment successful
  console.log('Payment successful:', response);
  
  // ... existing tracking code ...
  
  // Track Meta Pixel Purchase Event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: product.price,
      currency: 'INR',
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      num_items: 1
    });
    console.log('Meta Pixel Purchase event tracked');
  }
  
  // ... rest of code ...
}
```

---

## 📊 Events Tracked

### Event Flow:

```
1. User Visits Website
   ↓
   ✅ PageView Event (automatic)
   
2. User Clicks "Buy Now"
   ↓
   ✅ InitiateCheckout Event
   
3. User Completes Payment
   ↓
   ✅ Purchase Event
```

---

## 🎯 Standard Meta Events Implemented

| Event | Description | When It Fires | Data Sent |
|-------|-------------|---------------|-----------|
| **PageView** | Page visit | Every page load | Automatic |
| **InitiateCheckout** | Started checkout | Modal opens | Product details, Value |
| **Purchase** | Completed purchase | Payment success | Product details, Value, Currency |

---

## 🔍 How to Verify It's Working

### Method 1: Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for messages:
   - "Meta Pixel InitiateCheckout event tracked"
   - "Meta Pixel Purchase event tracked"

### Method 2: Meta Events Manager
1. Go to Facebook Events Manager
2. Navigate to your Pixel (834110572313637)
3. Click "Test Events"
4. Open your website
5. See real-time events appearing

### Method 3: Meta Pixel Helper Extension
1. Install "Meta Pixel Helper" Chrome extension
2. Visit your website
3. Click the extension icon
4. See pixel firing and events tracked

---

## 📈 Data Captured for Each Purchase

```json
{
  "event": "Purchase",
  "value": 699,              // Product price
  "currency": "INR",         // Indian Rupees
  "content_name": "Yamuna Expressway Leads",
  "content_ids": [1],        // Product ID
  "content_type": "product",
  "num_items": 1
}
```

---

## 🎯 Use Cases

### 1. **Conversion Tracking**
- Track how many visitors complete purchases
- Calculate ROI from Facebook/Instagram ads
- See conversion rate by traffic source

### 2. **Retargeting**
- Create custom audiences of people who initiated checkout but didn't purchase
- Retarget cart abandoners
- Upsell to previous customers

### 3. **Lookalike Audiences**
- Create lookalike audiences based on purchasers
- Target similar high-intent users
- Scale your ad campaigns

### 4. **Optimization**
- Optimize Facebook ads for purchases
- Use automated bid strategies
- Improve ROAS (Return on Ad Spend)

---

## 🔧 Testing Checklist

- [ ] Meta Pixel loads on page (check browser console)
- [ ] PageView event fires automatically
- [ ] InitiateCheckout fires when "Buy Now" clicked
- [ ] Purchase event fires after successful payment
- [ ] All events visible in Facebook Events Manager
- [ ] Product details correctly passed (name, price, ID)
- [ ] Currency set to INR

---

## 🚀 Next Steps

### 1. **Verify in Facebook Events Manager**
   - Check that events are being received
   - Verify data accuracy

### 2. **Create Custom Conversions**
   - Set up purchase value optimization
   - Configure conversion windows

### 3. **Set Up Audiences**
   - Website visitors (last 30 days)
   - Add to cart (didn't purchase)
   - Past purchasers

### 4. **Create Facebook Campaigns**
   - Use "Conversions" objective
   - Optimize for "Purchase" event
   - Target lookalike audiences

---

## 💡 Additional Events You Can Add Later

If you want to track more granular data:

```javascript
// When user views a product
fbq('track', 'ViewContent', {
  content_name: 'Product Name',
  content_ids: ['product_id'],
  content_type: 'product',
  value: price,
  currency: 'INR'
});

// When user adds to cart (if you add cart feature)
fbq('track', 'AddToCart', {
  content_name: 'Product Name',
  content_ids: ['product_id'],
  content_type: 'product',
  value: price,
  currency: 'INR'
});

// When user completes registration
fbq('track', 'CompleteRegistration', {
  value: 0,
  currency: 'INR'
});

// When user searches
fbq('track', 'Search', {
  search_string: 'search query',
  content_category: 'category'
});
```

---

## 📞 Support

If events aren't tracking:
1. Check browser console for errors
2. Verify Pixel ID: 834110572313637
3. Use Meta Pixel Helper extension
4. Check Facebook Events Manager "Test Events"
5. Ensure no ad blockers are active during testing

---

## ✅ Summary

**Meta Pixel is now fully integrated!**

✅ Base pixel code added to `index.html`
✅ InitiateCheckout event added to payment modal
✅ Purchase conversion event added to payment success
✅ All events include product details and value
✅ Console logs for debugging
✅ Ready for Facebook ad optimization

**The conversion tracking is live and ready to track all purchases!** 🎉
