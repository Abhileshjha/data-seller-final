// Vercel Serverless Function for Purchase Tracking
import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory storage (will reset on cold starts)
// For production, use Vercel KV, MongoDB, or another database
let purchases: any[] = [];
let leads: any[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        if (action === 'purchases') {
          return res.status(200).json({ purchases });
        } else if (action === 'leads') {
          return res.status(200).json({ leads });
        } else if (action === 'analytics') {
          const analytics = {
            totalPurchases: purchases.length,
            totalRevenue: purchases.reduce((sum, p) => sum + (p.amount || 0), 0),
            totalLeads: leads.length,
            conversionRate: leads.length > 0 ? (purchases.length / leads.length) * 100 : 0,
            recentPurchases: purchases.slice(-5).reverse()
          };
          return res.status(200).json(analytics);
        }
        return res.status(400).json({ error: 'Invalid action' });

      case 'POST':
        const data = req.body;
        
        if (action === 'purchase') {
          const newPurchase = {
            ...data,
            id: `PURCH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString()
          };
          purchases.push(newPurchase);
          return res.status(201).json({ success: true, purchase: newPurchase });
        } else if (action === 'lead') {
          const newLead = {
            ...data,
            id: `LEAD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString()
          };
          leads.push(newLead);
          return res.status(201).json({ success: true, lead: newLead });
        }
        return res.status(400).json({ error: 'Invalid action' });

      case 'PUT':
        if (action === 'purchase') {
          const { id, ...updates } = req.body;
          const index = purchases.findIndex(p => p.id === id);
          if (index !== -1) {
            purchases[index] = { ...purchases[index], ...updates };
            return res.status(200).json({ success: true, purchase: purchases[index] });
          }
          return res.status(404).json({ error: 'Purchase not found' });
        }
        return res.status(400).json({ error: 'Invalid action' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
