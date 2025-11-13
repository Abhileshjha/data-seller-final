import React, { useState, useEffect } from 'react';
import { 
  getAllPurchases, 
  getAllLeads, 
  getAnalytics, 
  exportPurchasesCSV, 
  exportLeadsCSV,
  CustomerPurchase,
  CustomerLead
} from '../services/purchaseTrackingService';

const AdminBackendPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'leads'>('overview');
  const [purchases, setPurchases] = useState<CustomerPurchase[]>([]);
  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const purchasesData = await getAllPurchases();
    const leadsData = await getAllLeads();
    const analyticsData = await getAnalytics();
    
    setPurchases(purchasesData);
    setLeads(leadsData);
    setAnalytics(analyticsData);
  };

  const handleExportPurchases = async () => {
    const csv = await exportPurchasesCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `purchases_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleExportLeads = async () => {
    const csv = await exportLeadsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredPurchases = purchases.filter(p => 
    p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.customerPhone.includes(searchTerm)
  );

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phone.includes(searchTerm)
  );

  const StatCard = ({ title, value, subtitle, icon, color }: any) => (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm font-medium">{title}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Backend</h1>
          <p className="text-gray-400">Manage customers, purchases, and leads</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 border-b border-dark-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'overview'
                ? 'text-brand-blue border-b-2 border-brand-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'purchases'
                ? 'text-brand-blue border-b-2 border-brand-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Purchases ({purchases.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'leads'
                ? 'text-brand-blue border-b-2 border-brand-blue'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Leads ({leads.length})
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Revenue"
                value={`₹${analytics.totalRevenue.toLocaleString()}`}
                subtitle="All time earnings"
                color="bg-green-500/10"
                icon={<svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <StatCard
                title="Successful Purchases"
                value={analytics.successfulPurchases}
                subtitle={`${analytics.conversionRate}% conversion rate`}
                color="bg-blue-500/10"
                icon={<svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <StatCard
                title="Total Leads"
                value={analytics.totalLeads}
                subtitle="Contact form submissions"
                color="bg-purple-500/10"
                icon={<svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
              <StatCard
                title="Failed Payments"
                value={analytics.failedPurchases}
                subtitle="Requires follow-up"
                color="bg-red-500/10"
                icon={<svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Purchases</h3>
                <div className="space-y-3">
                  {analytics.recentPurchases.slice(0, 5).map((purchase: CustomerPurchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                      <div className="flex-1">
                        <p className="text-white font-medium">{purchase.customerName}</p>
                        <p className="text-gray-400 text-sm">{purchase.productName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">₹{purchase.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          purchase.paymentStatus === 'success' ? 'bg-green-500/20 text-green-400' :
                          purchase.paymentStatus === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {purchase.paymentStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Recent Leads</h3>
                <div className="space-y-3">
                  {analytics.recentLeads.slice(0, 5).map((lead: CustomerLead) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                      <div className="flex-1">
                        <p className="text-white font-medium">{lead.name}</p>
                        <p className="text-gray-400 text-sm">{lead.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        lead.status === 'purchased' ? 'bg-green-500/20 text-green-400' :
                        lead.status === 'payment_initiated' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purchases Tab */}
        {activeTab === 'purchases' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-md px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-brand-blue"
              />
              <button
                onClick={handleExportPurchases}
                className="ml-4 px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Export CSV
              </button>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-bg border-b border-dark-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Payment ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {filteredPurchases.map((purchase) => (
                      <tr key={purchase.id} className="hover:bg-dark-bg/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(purchase.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{purchase.customerName}</div>
                          <div className="text-sm text-gray-400">{purchase.customerEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {purchase.customerPhone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {purchase.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                          ₹{purchase.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            purchase.paymentStatus === 'success' ? 'bg-green-500/20 text-green-400' :
                            purchase.paymentStatus === 'failed' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {purchase.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {purchase.paymentId || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredPurchases.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No purchases found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 max-w-md px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:border-brand-blue"
              />
              <button
                onClick={handleExportLeads}
                className="ml-4 px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Export CSV
              </button>
            </div>

            <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-bg border-b border-dark-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Product Interest</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-border">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-dark-bg/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {lead.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {lead.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {lead.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          Product #{lead.productInterest || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            lead.status === 'purchased' ? 'bg-green-500/20 text-green-400' :
                            lead.status === 'payment_initiated' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLeads.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No leads found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBackendPage;
