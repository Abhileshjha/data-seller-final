import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

interface PaymentDetails {
  payment_id: string;
  product_id: number;
  amount: number;
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  timestamp: string;
}

const ThankYouPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const product = PRODUCTS.find(p => p.id === Number(productId));
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

    useEffect(() => {
        // Retrieve payment details from localStorage
        const storedPaymentDetails = localStorage.getItem('payment_details');
        if (storedPaymentDetails) {
            try {
                const details = JSON.parse(storedPaymentDetails);
                setPaymentDetails(details);
            } catch (error) {
                console.error('Error parsing payment details:', error);
            }
        }
    }, []);

    if (!product) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="text-center max-w-3xl mx-auto py-16">
            <div className="bg-dark-card p-8 md:p-12 rounded-2xl shadow-lg border border-dark-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-20 w-20 text-green-500 mx-auto mb-6"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Thank You for Your Purchase!</h1>
                <p className="text-lg text-gray-300 mb-8">
                    Your download for <span className="font-bold text-brand-blue">{product.name}</span> is ready.
                </p>

                {paymentDetails && (
                    <div className="bg-dark-bg p-6 rounded-lg border border-dark-border mb-8 text-left">
                        <h3 className="text-xl font-bold text-white mb-4">Payment Confirmation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Transaction ID:</span>
                                <p className="text-white font-mono text-xs break-all">{paymentDetails.payment_id}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Amount Paid:</span>
                                <p className="text-white font-bold">₹{paymentDetails.amount}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Customer Name:</span>
                                <p className="text-white">{paymentDetails.customer.name}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Email:</span>
                                <p className="text-white">{paymentDetails.customer.email}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Contact:</span>
                                <p className="text-white">{paymentDetails.customer.contact}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Purchase Date:</span>
                                <p className="text-white">{new Date(paymentDetails.timestamp).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                <a
                    href={product.downloadUrl}
                    download
                    className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue text-white font-bold rounded-lg text-lg hover:bg-blue-500 transition-transform transform hover:scale-105 shadow-lg shadow-brand-blue/30"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download Data Sheet ({product.dataPoints} records)
                </a>

                <div className="mt-8 p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
                    <h4 className="text-green-400 font-bold mb-2">What's Included:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                        <li>• {product.dataPoints} verified lead records</li>
                        <li>• Excel/CSV format for easy integration</li>
                        <li>• Contact details: Name, Phone, Email, Location</li>
                        <li>• Source: {product.source}</li>
                        <li>• Locations: {product.locations}</li>
                    </ul>
                </div>

                <div className="mt-10">
                    <Link to="/" className="text-gray-400 hover:text-brand-blue transition-colors">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;