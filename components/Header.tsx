import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const { hash, pathname } = useLocation();
  const currentPath = pathname + hash;
  const isActive = to === '/' ? currentPath === '#/' || currentPath === '' || pathname === '/' && hash === '' : currentPath.startsWith(`#${to}`);
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-brand-blue text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  const auth = useAuth();

  return (
    <header className="bg-dark-card/80 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-dark-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span className="text-xl font-bold text-white">Data Seller Pro</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/">Home</NavLink>
            {auth.isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
            {auth.isAuthenticated && <NavLink to="/admin/backend">Admin Backend</NavLink>}
            {auth.isAuthenticated ? (
              <button
                onClick={auth.logout}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">Admin Login</NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;