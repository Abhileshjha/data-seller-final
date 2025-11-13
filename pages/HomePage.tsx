
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import BlurredDataSample from '../components/BlurredDataSample';
import PaymentModal from '../components/PaymentModal';

const HomePage: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const navigate = useNavigate();

    const handlePurchase = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handlePaymentSuccess = (product: Product) => {
        handleCloseModal();
        navigate(`/thank-you/${product.id}`);
    };

    return (
        <>
            <div className="text-center pt-8 pb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                    Unlock High-Quality <span className="text-brand-blue">Marketing Data</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                    Get instant access to thousands of verified leads generated from targeted Google and Meta ad campaigns.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PRODUCTS.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onPurchase={handlePurchase}
                        isFeatured={product.id === 2}
                    />
                ))}
            </div>

            <BlurredDataSample />

            {selectedProduct && <PaymentModal 
                product={selectedProduct} 
                onClose={handleCloseModal} 
                onSuccess={handlePaymentSuccess} 
            />}
        </>
    );
};

export default HomePage;
