import React, { useState, useEffect } from 'react';
import TrafficSourceChart from '../components/charts/TrafficSourceChart';
import VisitorActivityChart from '../components/charts/VisitorActivityChart';
import CustomerDataPage from './CustomerDataPage';
import { customerDataService, type CustomerData } from '../services/customerDataService';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-dark-card p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-dark-border">
        <div className="p-3 bg-brand-blue/20 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const PaymentGatewaySettings: React.FC = () => {
    const [apiKey, setApiKey] = React.useState('pk_test_************************');
    const [secretKey, setSecretKey] = React.useState('sk_test_************************');
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            // In a real app, you might show a success toast here
        }, 1500);
    };
    
    return (
        <div className="bg-dark-card p-6 rounded-lg shadow-lg border border-dark-border">
            <h2 className="text-xl font-semibold text-white mb-4">Payment Gateway Settings</h2>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                    <input 
                        type="password" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-brand-blue focus:border-brand-blue" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Secret Key</label>
                    <input 
                        type="password" 
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-brand-blue focus:border-brand-blue" 
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-brand-blue text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const DashboardOverview: React.FC = () => {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalPurchases: 0,
        conversionRate: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        const updateStats = () => {
            const allCustomers = customerDataService.getAllCustomerData();
            const completedPurchases = allCustomers.filter(customer => customer.paymentStatus === 'completed');
            const totalRevenue = completedPurchases.reduce((sum, customer) => sum + customer.amount, 0);
            const conversionRate = allCustomers.length > 0 ? (completedPurchases.length / allCustomers.length) * 100 : 0;

            setStats({
                totalCustomers: allCustomers.length,
                totalPurchases: completedPurchases.length,
                conversionRate: Math.round(conversionRate * 100) / 100, // Round to 2 decimal places
                totalRevenue: totalRevenue
            });
        };

        // Update stats immediately
        updateStats();

        // Set up interval to update stats every 5 seconds for live updates
        const interval = setInterval(updateStats, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <StatCard 
                    title="Total Customers" 
                    value={stats.totalCustomers.toString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                />
                 <StatCard 
                    title="Completed Purchases" 
                    value={stats.totalPurchases.toString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>}
                />
                 <StatCard 
                    title="Conversion Rate" 
                    value={`${stats.conversionRate}%`} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                />
                <StatCard 
                    title="Total Revenue" 
                    value={`₹${stats.totalRevenue.toLocaleString()}`} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-dark-card p-6 rounded-lg shadow-lg border border-dark-border">
                    <h2 className="text-xl font-semibold text-white mb-4">Customer Activity (Last 7 Days)</h2>
                    <VisitorActivityChart />
                </div>
                <div className="lg:col-span-2 bg-dark-card p-6 rounded-lg shadow-lg border border-dark-border">
                    <h2 className="text-xl font-semibold text-white mb-4">Payment Status Distribution</h2>
                    <TrafficSourceChart />
                </div>
            </div>

            <PaymentGatewaySettings />
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        {
            id: 'overview',
            name: 'Overview',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        },
        {
            id: 'customers',
            name: 'Customer Data',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-dark-border mb-8">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab.id
                                    ? 'border-brand-blue text-brand-blue'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'overview' && <DashboardOverview />}
                {activeTab === 'customers' && <CustomerDataPage />}
            </div>
        </div>
    );
};

export default DashboardPage;