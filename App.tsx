import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AdminBackendPage from './pages/AdminBackendPage';
import ThankYouPage from './pages/ThankYouPage';
import LoginPage from './pages/LoginPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    React.useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <AuthProvider>
                <PageLayout>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/thank-you/:productId" element={<ThankYouPage />} />
                        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                        <Route path="/refund-policy" element={<RefundPolicyPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route 
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <DashboardPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/admin/backend" 
                            element={
                                <ProtectedRoute>
                                    <AdminBackendPage />
                                </ProtectedRoute>
                            } 
                        />
                    </Routes>
                </PageLayout>
            </AuthProvider>
        </HashRouter>
    );
};

export default App;