import React, { useState } from 'react';
import TrafficSourceChart from '../components/charts/TrafficSourceChart';
import VisitorActivityChart from '../components/charts/VisitorActivityChart';
import CustomerDataPage from './CustomerDataPage';

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
        <div className="bg-dark-card p-6 rounded-lg shadow-lg border border-dark-border mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Payment Gateway Settings</h2>
            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-1">API Key</label>
                    <input 
                        id="api-key" 
                        type="text" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-brand-blue focus:border-brand-blue" 
                    />
                </div>
                <div>
                    <label htmlFor="secret-key" className="block text-sm font-medium text-gray-300 mb-1">Secret Key</label>
                    <input 
                        id="secret-key" 
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


const DashboardPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 <StatCard 
                    title="Total Visitors (7d)" 
                    value="1,470" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                />
                 <StatCard 
                    title="Purchases (7d)" 
                    value="42" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>}
                />
                 <StatCard 
                    title="Conversion Rate" 
                    value="2.86%" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
                />
                <StatCard 
                    title="Revenue (7d)" 
                    value="₹51,258" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-brand-blue"><rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-dark-card p-6 rounded-lg shadow-lg border border-dark-border">
                    <h2 className="text-xl font-semibold text-white mb-4">Weekly Visitor Activity</h2>
                    <VisitorActivityChart />
                </div>
                <div className="lg:col-span-2 bg-dark-card p-6 rounded-lg shadow-lg border border-dark-border">
                    <h2 className="text-xl font-semibold text-white mb-4">Traffic Sources</h2>
                    <TrafficSourceChart />
                </div>
            </div>

            <PaymentGatewaySettings />
        </div>
    );
};

export default DashboardPage;