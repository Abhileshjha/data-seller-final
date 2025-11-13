# Vercel Deployment Guide

## ✅ Files Created for Vercel Backend

### 1. API Route: `/api/purchases.ts`
Serverless function that handles all backend operations:
- GET `/api/purchases?action=purchases` - Get all purchases
- GET `/api/purchases?action=leads` - Get all leads  
- GET `/api/purchases?action=analytics` - Get analytics data
- POST `/api/purchases?action=purchase` - Save new purchase
- POST `/api/purchases?action=lead` - Save new lead
- PUT `/api/purchases?action=purchase` - Update purchase status

### 2. Configuration: `vercel.json`
Routing configuration for Vercel deployment

### 3. Updated Service: `services/purchaseTrackingService.ts`
Now supports both:
- **API backend** (when deployed on Vercel)
- **localStorage fallback** (for local development)

---

## 🚀 How to Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```powershell
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```powershell
   vercel login
   ```

3. **Deploy**
   ```powershell
   vercel
   ```
   
4. **Deploy to Production**
   ```powershell
   vercel --prod
   ```

### Method 2: GitHub Integration

1. **Push code to GitHub**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit with Vercel backend"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Deploy"

---

## ⚙️ Vercel Project Settings

### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Root Directory
- Leave as `.` (root)

### Environment Variables
No environment variables needed (all hardcoded for this project)

---

## 🔄 How the Backend Works

### On Vercel (Production):
1. User makes a purchase → Data sent to `/api/purchases`
2. API stores data in memory (resets on cold starts)
3. Also saves to localStorage as backup
4. Admin backend fetches from API

### Locally (Development):
1. API route may not work
2. Falls back to localStorage automatically
3. All data stored in browser

### Important Notes:
⚠️ **Current API uses in-memory storage** - Data will be lost on:
- Vercel function cold starts
- Redeployments
- Server restarts

---

## 💾 Upgrade to Persistent Storage (Recommended for Production)

### Option 1: Vercel KV (Redis)

1. **Install Vercel KV**
   ```powershell
   npm install @vercel/kv
   ```

2. **Enable KV in Vercel Dashboard**
   - Go to your project
   - Storage tab
   - Create KV Database

3. **Update `api/purchases.ts`** - Replace arrays with KV:
   ```typescript
   import { kv } from '@vercel/kv';
   
   // Get purchases
   const purchases = await kv.get('purchases') || [];
   
   // Save purchase
   await kv.set('purchases', [...purchases, newPurchase]);
   ```

### Option 2: MongoDB Atlas (Free Tier)

1. **Create MongoDB Atlas account** at mongodb.com
2. **Install MongoDB client**
   ```powershell
   npm install mongodb
   ```
3. **Add connection string** to Vercel environment variables
4. **Update API** to use MongoDB

### Option 3: Supabase (Free Tier)

1. **Create Supabase project** at supabase.com
2. **Install client**
   ```powershell
   npm install @supabase/supabase-js
   ```
3. **Add environment variables** in Vercel
4. **Update API** to use Supabase

---

## 🧪 Testing After Deployment

### Test the API:
```powershell
# Get purchases
curl https://your-app.vercel.app/api/purchases?action=purchases

# Get leads
curl https://your-app.vercel.app/api/purchases?action=leads

# Get analytics
curl https://your-app.vercel.app/api/purchases?action=analytics
```

### Test the Admin Backend:
1. Go to `https://your-app.vercel.app/#/admin/backend`
2. Login with: `admin` / `admin123`
3. Check if data appears in Overview, Purchases, and Leads tabs

### Test Purchases:
1. Go to homepage
2. Click "Buy Now" on any product
3. Fill in customer details
4. Complete payment (use Razorpay test mode if needed)
5. Check admin backend for the new purchase

---

## 🔧 Troubleshooting

### Issue: Backend shows no data after deployment

**Solution 1: Check API is working**
```powershell
# Open browser console on admin page
console.log(await fetch('/api/purchases?action=purchases').then(r => r.json()))
```

**Solution 2: Clear browser cache**
- The app might be using old localStorage data
- Clear localStorage: `localStorage.clear()`

**Solution 3: Check Vercel Function Logs**
- Go to Vercel Dashboard → Your Project → Functions
- Check for errors in the logs

### Issue: CORS errors

**Solution**: Add your domain to CORS settings in `api/purchases.ts`
```typescript
res.setHeader('Access-Control-Allow-Origin', 'https://your-domain.com');
```

### Issue: Data disappears after some time

**Cause**: In-memory storage resets on cold starts

**Solution**: Upgrade to persistent storage (KV, MongoDB, or Supabase)

---

## 📊 Current Architecture

```
Frontend (React + Vite)
    ↓
    ↓ (API Calls)
    ↓
API Route (/api/purchases.ts)
    ↓
In-Memory Storage (Temporary)
    ↓
localStorage (Backup)
```

### Recommended Production Architecture:

```
Frontend (React + Vite)
    ↓
    ↓ (API Calls)
    ↓
API Route (/api/purchases.ts)
    ↓
Vercel KV / MongoDB / Supabase (Persistent)
    ↓
localStorage (Backup/Cache)
```

---

## 🔐 Security Recommendations

### Before Production:

1. **Secure Admin Panel**
   - Add real authentication (JWT, OAuth)
   - Remove hardcoded admin credentials
   - Use environment variables

2. **Protect API Routes**
   ```typescript
   // Add API key check
   const apiKey = req.headers['x-api-key'];
   if (apiKey !== process.env.API_SECRET_KEY) {
     return res.status(401).json({ error: 'Unauthorized' });
   }
   ```

3. **Rate Limiting**
   - Add rate limiting to prevent abuse
   - Use Vercel's built-in rate limiting

4. **Input Validation**
   - Validate all incoming data
   - Sanitize user inputs

---

## 📝 Deployment Checklist

- [ ] Code pushed to repository
- [ ] `@vercel/node` installed
- [ ] `vercel.json` configured
- [ ] API routes tested locally
- [ ] Environment variables set (if any)
- [ ] Build settings configured in Vercel
- [ ] Domain configured (optional)
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Meta Pixel tracking tested
- [ ] Razorpay payment gateway tested
- [ ] Admin backend accessible
- [ ] All CSV download links working
- [ ] Mobile responsiveness verified

---

## 🎉 Quick Deploy Command

```powershell
# One-command deploy to Vercel
vercel --prod
```

After deployment, your website will be live at:
`https://your-project-name.vercel.app`

---

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Test API endpoints manually
3. Verify build completed successfully
4. Check browser console for errors
5. Review this guide for troubleshooting steps

**Your website is ready for Vercel deployment!** 🚀
