# Quick Domain Setup (10 Minutes)

## 🎯 Fastest Way to Get Your Custom Domain

### Step 1: Buy Domain (2 minutes)

1. Go to [namecheap.com](https://www.namecheap.com)
2. Search: `anandjha.com` (or your preferred name)
3. Add to cart → Checkout
4. **Cost:** ~$10-15/year

### Step 2: Deploy to Vercel (3 minutes)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - New Project → Import GitHub repo
   - Deploy
   - Get: `your-site.vercel.app`

### Step 3: Add Domain to Vercel (2 minutes)

1. **In Vercel:**
   - Project → Settings → Domains
   - Click "Add Domain"
   - Enter: `anandjha.com`
   - Click "Add"

2. **Vercel shows DNS records:**
   - Copy the IP address (e.g., `76.76.21.21`)
   - Copy the CNAME value

### Step 4: Configure DNS (3 minutes)

1. **Go to Namecheap:**
   - Login → Domain List → Manage → Advanced DNS

2. **Add Records:**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21 (from Vercel)
   
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com (from Vercel)
   ```

3. **Save**

### Step 5: Wait & Test

1. **Wait 5-60 minutes** for DNS
2. **Visit:** `https://anandjha.com`
3. **Done!** ✅

---

## 🔧 Backend Setup (Optional)

### Use Subdomain for Backend:

1. **Deploy backend to Render** (get: `portfolio-backend.onrender.com`)

2. **Add DNS record:**
   ```
   Type: CNAME
   Host: api
   Value: portfolio-backend.onrender.com
   ```

3. **Update frontend:**
   ```typescript
   // src/App.tsx
   'https://api.anandjha.com/api/contact'
   ```

4. **Now backend is at:** `https://api.anandjha.com`

---

## ✅ Checklist

- [ ] Domain purchased
- [ ] Frontend deployed to Vercel
- [ ] Domain added in Vercel
- [ ] DNS records configured
- [ ] SSL certificate issued (automatic)
- [ ] Website accessible at custom domain
- [ ] Backend configured (optional)

---

**Total Time:** ~10 minutes  
**Total Cost:** ~$10-15/year

**Your website:** `https://anandjha.com` 🎉

