// Customer Data Management Interface
export interface CustomerData {
  id: string;
  name: string;
  email: string;
  contact: string;
  productId: number;
  productName: string;
  amount: number;
  paymentId?: string;
  paymentStatus: 'initiated' | 'completed' | 'failed';
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}

// Customer Data Storage Service
class CustomerDataService {
  private readonly STORAGE_KEY = 'customer_data_collection';
  
  // Save customer data
  saveCustomerData(data: Omit<CustomerData, 'id' | 'timestamp'>): CustomerData {
    const customerData: CustomerData = {
      ...data,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      ipAddress: 'localhost', // In real app, get from request
      userAgent: navigator.userAgent
    };
    
    const existingData = this.getAllCustomerData();
    const updatedData = [...existingData, customerData];
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    
    return customerData;
  }
  
  // Get all customer data
  getAllCustomerData(): CustomerData[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving customer data:', error);
      return [];
    }
  }
  
  // Update payment status
  updatePaymentStatus(customerId: string, paymentId: string, status: 'completed' | 'failed'): void {
    const allData = this.getAllCustomerData();
    const updatedData = allData.map(customer => 
      customer.id === customerId 
        ? { ...customer, paymentId, paymentStatus: status }
        : customer
    );
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
  }
  
  // Get customer data by email
  getCustomerByEmail(email: string): CustomerData | undefined {
    const allData = this.getAllCustomerData();
    return allData.find(customer => customer.email.toLowerCase() === email.toLowerCase());
  }
  
  // Get customer data by ID
  getCustomerById(id: string): CustomerData | undefined {
    const allData = this.getAllCustomerData();
    return allData.find(customer => customer.id === id);
  }
  
  // Delete customer data
  deleteCustomerData(id: string): boolean {
    const allData = this.getAllCustomerData();
    const filteredData = allData.filter(customer => customer.id !== id);
    
    if (filteredData.length === allData.length) {
      return false; // No data was deleted
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredData));
    return true;
  }
  
  // Export data as CSV
  exportToCSV(): string {
    const data = this.getAllCustomerData();
    if (data.length === 0) return '';
    
    const headers = [
      'ID', 'Name', 'Email', 'Contact', 'Product Name', 'Amount (₹)', 
      'Payment Status', 'Payment ID', 'Date', 'IP Address'
    ];
    
    const csvRows = [
      headers.join(','),
      ...data.map(customer => [
        customer.id,
        `"${customer.name}"`,
        customer.email,
        customer.contact,
        `"${customer.productName}"`,
        customer.amount,
        customer.paymentStatus,
        customer.paymentId || 'N/A',
        new Date(customer.timestamp).toLocaleString(),
        customer.ipAddress || 'N/A'
      ].join(','))
    ];
    
    return csvRows.join('\n');
  }
  
  // Get statistics
  getStatistics() {
    const data = this.getAllCustomerData();
    const total = data.length;
    const completed = data.filter(c => c.paymentStatus === 'completed').length;
    const failed = data.filter(c => c.paymentStatus === 'failed').length;
    const initiated = data.filter(c => c.paymentStatus === 'initiated').length;
    
    const totalRevenue = data
      .filter(c => c.paymentStatus === 'completed')
      .reduce((sum, c) => sum + c.amount, 0);
    
    return {
      total,
      completed,
      failed,
      initiated,
      totalRevenue,
      conversionRate: total > 0 ? ((completed / total) * 100).toFixed(2) : '0.00'
    };
  }
  
  // Clear all data (admin only)
  clearAllData(): void {
    if (confirm('Are you sure you want to delete all customer data? This action cannot be undone.')) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
  
  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

// Export singleton instance
export const customerDataService = new CustomerDataService();

// Export utility functions
export const formatCustomerData = (data: CustomerData[]) => {
  return data.map(customer => ({
    ...customer,
    formattedDate: new Date(customer.timestamp).toLocaleString(),
    formattedAmount: `₹${customer.amount.toLocaleString()}`
  }));
};

export const filterCustomerData = (
  data: CustomerData[], 
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }
) => {
  let filtered = [...data];
  
  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(customer => customer.paymentStatus === filters.status);
  }
  
  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom);
    filtered = filtered.filter(customer => new Date(customer.timestamp) >= fromDate);
  }
  
  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo);
    toDate.setHours(23, 59, 59, 999);
    filtered = filtered.filter(customer => new Date(customer.timestamp) <= toDate);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(customer => 
      customer.name.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.contact.includes(searchLower) ||
      customer.productName.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
};