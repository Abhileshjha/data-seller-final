import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (user: string, pass: string): Promise<boolean> => {
    // In a real app, this would be an API call
    return new Promise(resolve => {
        setTimeout(() => {
            if (user === 'Ugna1908' && pass === 'Supriya@2003') {
                setIsAuthenticated(true);
                resolve(true);
            } else {
                setIsAuthenticated(false);
                resolve(false);
            }
        }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const value = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
