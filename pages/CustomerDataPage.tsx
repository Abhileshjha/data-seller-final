import React, { useState, useEffect } from 'react';
import { customerDataService, CustomerData, formatCustomerData, filterCustomerData } from '../services/customerDataService';

const CustomerDataPage: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [filteredData, setFilteredData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  // Load customer data
  useEffect(() => {
    loadCustomerData();
  }, []);

  // Apply filters when data or filters change
  useEffect(() => {
    const filtered = filterCustomerData(customerData, filters);
    setFilteredData(filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
  }, [customerData, filters]);

  const loadCustomerData = () => {
    setLoading(true);
    try {
      const data = customerDataService.getAllCustomerData();
      setCustomerData(data);
    } catch (error) {
      console.error('Error loading customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExportCSV = () => {
    const csv = customerDataService.exportToCSV();
    if (!csv) {
      alert('No data to export');
      return;
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customer-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm('Are you sure you want to delete this customer record?')) {
      const success = customerDataService.deleteCustomerData(id);
      if (success) {
        loadCustomerData();
      } else {
        alert('Failed to delete customer record');
      }
    }
  };

  const handleClearAllData = () => {
    customerDataService.clearAllData();
    loadCustomerData();
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      initiated: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const statistics = customerDataService.getStatistics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Customer Data Center</h1>
          <p className="text-gray-400 mt-1">Manage and analyze customer information and payment data</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Export CSV</span>
          </button>
          <button
            onClick={loadCustomerData}
            className="bg-brand-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Leads</p>
              <p className="text-2xl font-bold text-white">{statistics.total}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <polyline points="17 11 19 13 23 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-400">{statistics.completed}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{statistics.initiated}</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-white">₹{statistics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversion</p>
              <p className="text-2xl font-bold text-white">{statistics.conversionRate}%</p>
            </div>
            <div className="bg-indigo-500/20 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-brand-blue focus:border-brand-blue"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="initiated">Initiated</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">From Date</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-brand-blue focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">To Date</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-brand-blue focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full bg-dark-bg border border-dark-border rounded-md px-3 py-2 text-white focus:ring-brand-blue focus:border-brand-blue"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-border flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">
            Customer Records ({filteredData.length})
          </h3>
          {customerData.length > 0 && (
            <button
              onClick={handleClearAllData}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
            >
              Clear All Data
            </button>
          )}
        </div>

        {filteredData.length === 0 ? (
          <div className="p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-400 mb-4">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <h4 className="text-xl font-medium text-gray-300 mb-2">No Customer Data Found</h4>
            <p className="text-gray-500">
              {customerData.length === 0 
                ? "Customer data will appear here when users fill out the payment form."
                : "No records match your current filters."
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredData.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-white font-medium">{customer.name}</div>
                        <div className="text-gray-400 text-sm">{customer.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-300">{customer.contact}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white">{customer.productName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-white font-medium">₹{customer.amount.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(customer.paymentStatus)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-gray-300 text-sm">
                        {new Date(customer.timestamp).toLocaleDateString()}
                        <br />
                        <span className="text-gray-500">
                          {new Date(customer.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete Record"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDataPage;