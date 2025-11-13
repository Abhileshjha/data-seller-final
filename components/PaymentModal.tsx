
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { RAZORPAY_CONFIG, RazorpayOptions, RazorpayResponse } from '../config/razorpay';
import { customerDataService } from '../services/customerDataService';
import { savePurchase, saveLead, updatePurchaseStatus } from '../services/purchaseTrackingService';

interface PaymentModalProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: (product: Product) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    contact: ''
  });

  useEffect(() => {
    if (product) {
      setIsProcessing(false);
      setIsSuccess(false);
      
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
        console.log('Meta Pixel InitiateCheckout event tracked');
      }
    }
  }, [product]);

  if (!product) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRazorpayPayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.contact) {
      alert('Please fill in all customer details');
      return;
    }

    setIsProcessing(true);

    // Save lead first
    const lead = await saveLead({
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.contact,
      productInterest: product.id,
      status: 'payment_initiated'
    });

    // Save customer data immediately when payment is initiated
    const savedCustomerData = customerDataService.saveCustomerData({
      name: customerInfo.name,
      email: customerInfo.email,
      contact: customerInfo.contact,
      productId: product.id,
      productName: product.name,
      amount: product.price,
      paymentStatus: 'initiated'
    });
    
    // Track purchase initiation
    const purchase = await savePurchase({
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.contact,
      productId: product.id,
      productName: product.name,
      amount: product.price,
      paymentStatus: 'pending',
      orderId: `ORD_${Date.now()}`
    });
    
    setCurrentCustomerId(savedCustomerData.id);

    const options: RazorpayOptions = {
      key: RAZORPAY_CONFIG.key,
      amount: product.price * 100, // Razorpay expects amount in paise
      currency: RAZORPAY_CONFIG.currency,
      name: RAZORPAY_CONFIG.name,
      description: `${RAZORPAY_CONFIG.description} - ${product.name}`,
      image: RAZORPAY_CONFIG.image,
      prefill: {
        name: customerInfo.name,
        email: customerInfo.email,
        contact: customerInfo.contact
      },
      theme: RAZORPAY_CONFIG.theme,
      handler: async (response: RazorpayResponse) => {
        // Payment successful
        console.log('Payment successful:', response);
        
        // Update purchase tracking
        await updatePurchaseStatus(purchase.id, 'success', response.razorpay_payment_id);
        
        // Update customer data with payment success
        customerDataService.updatePaymentStatus(
          savedCustomerData.id,
          response.razorpay_payment_id,
          'completed'
        );
        
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
        
        setIsProcessing(false);
        setIsSuccess(true);
        
        // Store payment details for thank you page
        localStorage.setItem('payment_details', JSON.stringify({
          payment_id: response.razorpay_payment_id,
          product_id: product.id,
          amount: product.price,
          customer: customerInfo,
          timestamp: new Date().toISOString()
        }));

        setTimeout(() => {
          onSuccess(product);
        }, 1500);
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          // Mark payment as failed if user closes modal
          if (currentCustomerId) {
            customerDataService.updatePaymentStatus(
              currentCustomerId,
              'cancelled',
              'failed'
            );
            updatePurchaseStatus(purchase.id, 'failed');
          }
          console.log('Payment modal closed');
        }
      }
    };

    // Check if Razorpay is loaded
    if (typeof window.Razorpay !== 'undefined') {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Razorpay SDK not loaded. Please refresh the page and try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-dark-card rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-md my-8 transform transition-all duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Secure Checkout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="bg-dark-bg p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-dark-border">
          <p className="text-sm sm:text-base text-gray-400">{product.name}</p>
          <p className="text-xl sm:text-2xl font-bold text-white">Total: ₹{product.price}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{product.dataPoints} data points included</p>
        </div>

        {isSuccess ? (
          <div className="text-center py-6 sm:py-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4 animate-pulse"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <h3 className="text-lg sm:text-xl font-bold text-green-400">Payment Successful!</h3>
            <p className="text-sm sm:text-base text-gray-300 mt-2">Redirecting to your download page...</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="customer-name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Full Name *</label>
              <input 
                id="customer-name" 
                name="name"
                type="text" 
                value={customerInfo.name}
                onChange={handleInputChange}
                placeholder="Enter your full name" 
                className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm sm:text-base text-white focus:ring-brand-blue focus:border-brand-blue" 
                required
              />
            </div>
            
            <div>
              <label htmlFor="customer-email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Email Address *</label>
              <input 
                id="customer-email" 
                name="email"
                type="email" 
                value={customerInfo.email}
                onChange={handleInputChange}
                placeholder="Enter your email" 
                className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm sm:text-base text-white focus:ring-brand-blue focus:border-brand-blue" 
                required
              />
            </div>
            
            <div>
              <label htmlFor="customer-contact" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">Phone Number *</label>
              <input 
                id="customer-contact" 
                name="contact"
                type="tel" 
                value={customerInfo.contact}
                onChange={handleInputChange}
                placeholder="Enter your phone number" 
                className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-sm sm:text-base text-white focus:ring-brand-blue focus:border-brand-blue" 
                required
              />
            </div>

            <div className="text-center text-xs sm:text-sm text-gray-400 pt-2">
              By proceeding with payment, you agree to our{' '}
              <a href="#/terms-and-conditions" target="_blank" className="text-brand-blue hover:underline">Terms & Conditions</a> and{' '}
              <a href="#/privacy-policy" target="_blank" className="text-brand-blue hover:underline">Privacy Policy</a>.
            </div>
            
            <button
              onClick={handleRazorpayPayment}
              disabled={isProcessing || !customerInfo.name || !customerInfo.email || !customerInfo.contact}
              className="w-full bg-brand-blue text-white font-bold py-2.5 sm:py-3 rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center mt-4 sm:mt-6 text-sm sm:text-base"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                  Pay ₹{product.price} with Razorpay
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
