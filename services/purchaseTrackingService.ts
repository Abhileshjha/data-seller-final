// Customer Purchase Tracking Service
// Supports both localStorage (dev) and API backend (production/Vercel)

export interface CustomerPurchase {
  id: string;
  timestamp: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productId: number;
  productName: string;
  amount: number;
  paymentStatus: 'pending' | 'success' | 'failed';
  paymentId?: string;
  orderId?: string;
}

export interface CustomerLead {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  productInterest?: number;
  status: 'lead' | 'payment_initiated' | 'purchased';
}

const STORAGE_KEYS = {
  PURCHASES: 'customer_purchases',
  LEADS: 'customer_leads'
};

// API endpoint
const API_BASE = '/api/purchases';

// Helper functions for localStorage
const getAllPurchasesLocal = (): CustomerPurchase[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.PURCHASES);
  return data ? JSON.parse(data) : [];
};

// Purchase Tracking Functions
export const savePurchase = async (purchase: Omit<CustomerPurchase, 'id' | 'timestamp'>): Promise<CustomerPurchase> => {
  const newPurchase: CustomerPurchase = {
    ...purchase,
    id: `PURCH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  };

  // Try API first
  try {
    const response = await fetch(`${API_BASE}?action=purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchase)
    });
    
    if (response.ok) {
      const data = await response.json();
      // Also save to localStorage as backup
      const purchases = getAllPurchasesLocal();
      purchases.push(data.purchase);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
      }
      return data.purchase;
    }
  } catch (error) {
    console.warn('API unavailable, using localStorage:', error);
  }

  // Fallback to localStorage
  const purchases = getAllPurchasesLocal();
  purchases.push(newPurchase);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
  }
  return newPurchase;
};

export const getAllPurchases = async (): Promise<CustomerPurchase[]> => {
  // Try API first
  try {
    const response = await fetch(`${API_BASE}?action=purchases`);
    if (response.ok) {
      const data = await response.json();
      return data.purchases || [];
    }
  } catch (error) {
    console.warn('API unavailable, using localStorage:', error);
  }
  
  // Fallback to localStorage
  return getAllPurchasesLocal();
};

export const updatePurchaseStatus = async (
  purchaseId: string, 
  status: 'success' | 'failed', 
  paymentId?: string
): Promise<void> => {
  // Try API first
  try {
    const response = await fetch(`${API_BASE}?action=purchase`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: purchaseId, paymentStatus: status, paymentId })
    });
    
    if (response.ok) {
      // Update localStorage too
      const purchases = getAllPurchasesLocal();
      const index = purchases.findIndex(p => p.id === purchaseId);
      if (index !== -1) {
        purchases[index].paymentStatus = status;
        if (paymentId) purchases[index].paymentId = paymentId;
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
        }
      }
      return;
    }
  } catch (error) {
    console.warn('API unavailable, using localStorage:', error);
  }

  // Fallback to localStorage
  const purchases = getAllPurchasesLocal();
  const index = purchases.findIndex(p => p.id === purchaseId);
  if (index !== -1) {
    purchases[index].paymentStatus = status;
    if (paymentId) purchases[index].paymentId = paymentId;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
    }
  }
};

// Lead Tracking Functions
const getAllLeadsLocal = (): CustomerLead[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.LEADS);
  return data ? JSON.parse(data) : [];
};

export const saveLead = async (lead: Omit<CustomerLead, 'id' | 'timestamp'>): Promise<CustomerLead> => {
  const newLead: CustomerLead = {
    ...lead,
    id: `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  };

  // Try API first
  try {
    const response = await fetch(`${API_BASE}?action=lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLead)
    });
    
    if (response.ok) {
      const data = await response.json();
      // Also save to localStorage
      const leads = getAllLeadsLocal();
      leads.push(data.lead);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      }
      return data.lead;
    }
  } catch (error) {
    console.warn('API unavailable, using localStorage:', error);
  }

  // Fallback to localStorage
  const leads = getAllLeadsLocal();
  leads.push(newLead);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }
  return newLead;
};

export const getAllLeads = async (): Promise<CustomerLead[]> => {
  // Try API first
  try {
    const response = await fetch(`${API_BASE}?action=leads`);
    if (response.ok) {
      const data = await response.json();
      return data.leads || [];
    }
  } catch (error) {
    console.warn('API unavailable, using localStorage:', error);
  }
  
  // Fallback to localStorage
  return getAllLeadsLocal();
};

export const updateLeadStatus = async (
  leadId: string, 
  status: CustomerLead['status']
): Promise<void> => {
  const leads = getAllLeadsLocal();
  const index = leads.findIndex(l => l.id === leadId);
  if (index !== -1) {
    leads[index].status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    }
  }
};

// Analytics Functions
export const getAnalytics = async () => {
  // Try API first
  try {
    const response = await fetch(`${API_BASE}?action=analytics`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('API unavailable, calculating from localStorage:', error);
  }

  // Fallback to localStorage
  const purchases = getAllPurchasesLocal();
  const leads = getAllLeadsLocal();

  const successfulPurchases = purchases.filter(p => p.paymentStatus === 'success');
  const totalRevenue = successfulPurchases.reduce((sum, p) => sum + p.amount, 0);
  
  const productSales = successfulPurchases.reduce((acc, p) => {
    acc[p.productId] = (acc[p.productId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const recentPurchases = purchases
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  const recentLeads = leads
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  return {
    totalPurchases: purchases.length,
    successfulPurchases: successfulPurchases.length,
    failedPurchases: purchases.filter(p => p.paymentStatus === 'failed').length,
    pendingPurchases: purchases.filter(p => p.paymentStatus === 'pending').length,
    totalRevenue,
    totalLeads: leads.length,
    productSales,
    recentPurchases,
    recentLeads,
    conversionRate: leads.length > 0 ? ((successfulPurchases.length / leads.length) * 100).toFixed(2) : '0'
  };
};

// Export Data as CSV
export const exportPurchasesCSV = async (): Promise<string> => {
  const purchases = await getAllPurchases();
  const headers = ['Purchase ID', 'Date', 'Customer Name', 'Email', 'Phone', 'Product', 'Amount', 'Status', 'Payment ID'];
  const rows = purchases.map(p => [
    p.id,
    new Date(p.timestamp).toLocaleString(),
    p.customerName,
    p.customerEmail,
    p.customerPhone,
    p.productName,
    `₹${p.amount}`,
    p.paymentStatus,
    p.paymentId || 'N/A'
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

export const exportLeadsCSV = async (): Promise<string> => {
  const leads = await getAllLeads();
  const headers = ['Lead ID', 'Date', 'Name', 'Email', 'Phone', 'Product Interest', 'Status'];
  const rows = leads.map(l => [
    l.id,
    new Date(l.timestamp).toLocaleString(),
    l.name,
    l.email,
    l.phone,
    l.productInterest?.toString() || 'N/A',
    l.status
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.PURCHASES);
    localStorage.removeItem(STORAGE_KEYS.LEADS);
  }
};
