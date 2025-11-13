
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2 justify-center md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span className="text-xl font-bold text-white">Data Seller Pro</span>
            </Link>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">&copy; {currentYear} Data Seller Pro. All Rights Reserved.</p>
            <div className="mt-2 space-x-4">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-brand-blue transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="text-gray-400 hover:text-brand-blue transition-colors text-sm">Terms & Conditions</Link>
              <Link to="/refund-policy" className="text-gray-400 hover:text-brand-blue transition-colors text-sm">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
