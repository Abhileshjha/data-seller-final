
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPurchase: (product: Product) => void;
  isFeatured?: boolean;
}

const FeatureIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-brand-blue mr-3 mt-1 flex-shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span className="text-gray-300">{children}</span>
    </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase, isFeatured = false }) => {
  return (
    <div className={`relative flex flex-col bg-dark-card rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-brand-blue/20 ${isFeatured ? 'border-2 border-brand-blue shadow-brand-blue/30' : 'border border-dark-border'}`}>
      {isFeatured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
      )}
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-gray-400 mb-6 h-12">{product.description}</p>
        <div className="text-5xl font-extrabold text-white mb-6">
          ₹{product.price}
          <span className="text-lg font-medium text-gray-400">/ one-time</span>
        </div>
        <ul className="space-y-4 mb-8">
          <FeatureIcon><strong>{product.dataPoints}</strong> Data Points</FeatureIcon>
          <FeatureIcon>Source: <strong>{product.source}</strong></FeatureIcon>
          <FeatureIcon>Locations: <strong>{product.locations}</strong></FeatureIcon>
          <FeatureIcon>Instant Download (.csv)</FeatureIcon>
        </ul>
      </div>
      <button
        onClick={() => onPurchase(product)}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${isFeatured ? 'bg-brand-blue text-white hover:bg-blue-500 shadow-lg shadow-brand-blue/30' : 'bg-gray-600 text-white hover:bg-gray-500'}`}
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
