# Custom Domain Setup Guide

Complete guide to host your website with your own domain name (e.g., `anandjha.com`)

## 🎯 Overview

You'll need:
1. **Domain Name** - Buy from Namecheap, GoDaddy, etc.
2. **Frontend Hosting** - Vercel (supports custom domains FREE)
3. **Backend Hosting** - Render (custom domain requires paid plan) OR use subdomain
4. **DNS Configuration** - Point domain to your hosting

---

## Step 1: Buy a Domain Name

### Recommended Domain Registrars:

1. **Namecheap** (Recommended)
   - Visit: [namecheap.com](https://www.namecheap.com)
   - Search for your domain (e.g., `anandjha.com`)
   - Add to cart and checkout
   - **Cost:** ~$10-15/year

2. **GoDaddy**
   - Visit: [godaddy.com](https://www.godaddy.com)
   - Similar process
   - **Cost:** ~$12-20/year

3. **Google Domains**
   - Visit: [domains.google](https://domains.google)
   - Simple interface
   - **Cost:** ~$12/year

### Domain Suggestions:
- `anandjha.com`
- `anandmohanjha.com`
- `anandjha.dev`
- `anandjha.tech`
- `anandjha.net`

**Buy the domain** and note down where you bought it (you'll need to access DNS settings).

---

## Step 2: Deploy Frontend to Vercel

### First, deploy without custom domain:

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login
   - Click "New Project"
   - Import your GitHub repository
   - Deploy
   - You'll get: `your-site.vercel.app`

### Add Custom Domain:

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain: `anandjha.com`
   - Click "Add"

2. **Vercel will show DNS records:**
   - You'll see something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **Copy these DNS records** (you'll need them in Step 3)

---

## Step 3: Configure DNS Records

### Go to Your Domain Registrar:

1. **Login to your domain registrar** (Namecheap, GoDaddy, etc.)

2. **Find DNS Management:**
   - Namecheap: "Domain List" → "Manage" → "Advanced DNS"
   - GoDaddy: "My Products" → "DNS"
   - Google Domains: "DNS" tab

3. **Add DNS Records:**

   **For Root Domain (anandjha.com):**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21 (or IP shown by Vercel)
   TTL: Automatic
   ```

   **For WWW (www.anandjha.com):**
   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com (or value shown by Vercel)
   TTL: Automatic
   ```

4. **Save/Done**

5. **Wait 5-60 minutes** for DNS to propagate

6. **Check in Vercel:**
   - Go back to Vercel → Settings → Domains
   - Status should change to "Valid Configuration"
   - SSL certificate will be issued automatically (FREE)

---

## Step 4: Deploy Backend

### Option A: Use Render with Subdomain (FREE)

1. **Deploy backend to Render:**
   - Follow Render deployment steps
   - Your backend will be: `portfolio-backend.onrender.com`

2. **Use Subdomain:**
   - Update frontend API URL to: `https://api.anandjha.com`
   - In your domain DNS, add:
     ```
     Type: CNAME
     Host: api
     Value: portfolio-backend.onrender.com
     TTL: Automatic
     ```
   - Now backend is accessible at: `https://api.anandjha.com`

### Option B: Use Render Custom Domain (Paid)

1. **Upgrade Render to paid plan** ($7/month)
2. **In Render dashboard:**
   - Go to your service
   - Settings → Custom Domains
   - Add: `api.anandjha.com`
   - Add DNS record as shown

---

## Step 5: Update Frontend Code

### Update API URL:

**File:** `src/App.tsx`

```typescript
// Change from:
const response = await fetch('http://localhost:5000/api/contact', {

// To (if using subdomain):
const response = await fetch('https://api.anandjha.com/api/contact', {

// OR (if using Render default):
const response = await fetch('https://portfolio-backend.onrender.com/api/contact', {
```

### Update CORS in Backend:

**File:** `server/index.js`

```javascript
app.use(cors({
  origin: [
    'https://anandjha.com',
    'https://www.anandjha.com',
    'http://localhost:5173'  // Keep for local dev
  ],
  credentials: true
}));
```

### Rebuild and Redeploy:

```bash
npm run build
git add .
git commit -m "Update for custom domain"
git push
```

Vercel will auto-deploy with your custom domain!

---

## Step 6: Verify Everything Works

1. **Visit your domain:** `https://anandjha.com`
2. **Check SSL:** Should show padlock (HTTPS)
3. **Test contact form:** Submit a message
4. **Check MongoDB:** Verify data is saved

---

## 📋 Complete DNS Records Example

For domain `anandjha.com`, your DNS should have:

```
Type    Host    Value                          TTL
----    ----    -----                          ---
A       @       76.76.21.21                    Auto
CNAME   www     cname.vercel-dns.com           Auto
CNAME   api     portfolio-backend.onrender.com  Auto
```

---

## 🔒 SSL/HTTPS Certificate

- **Vercel:** Automatically provides FREE SSL certificate
- **Render:** Automatically provides FREE SSL certificate
- **No action needed!** Certificates are issued automatically

---

## 🎯 Complete Setup Summary

1. ✅ Buy domain (Namecheap/GoDaddy)
2. ✅ Deploy frontend to Vercel
3. ✅ Add custom domain in Vercel
4. ✅ Configure DNS records at registrar
5. ✅ Deploy backend to Render
6. ✅ Update frontend API URL
7. ✅ Update CORS in backend
8. ✅ Wait for DNS propagation (5-60 min)
9. ✅ Test your website!

---

## 💰 Cost Breakdown

- **Domain:** $10-15/year
- **Frontend (Vercel):** FREE (with custom domain)
- **Backend (Render):** FREE (or $7/month for custom domain)
- **Database (MongoDB Atlas):** FREE
- **SSL Certificate:** FREE (automatic)

**Total:** ~$10-15/year (or ~$100/year if using paid Render)

---

## 🐛 Troubleshooting

### Domain not working?
- ✅ Wait 24-48 hours for DNS propagation
- ✅ Check DNS records are correct
- ✅ Verify in Vercel dashboard (should show "Valid")
- ✅ Use DNS checker: [whatsmydns.net](https://www.whatsmydns.net)

### SSL not working?
- ✅ Wait 5-10 minutes after DNS setup
- ✅ Vercel issues SSL automatically
- ✅ Check Vercel dashboard for SSL status

### Backend not accessible?
- ✅ Check CORS settings
- ✅ Verify backend URL is correct
- ✅ Check Render logs

### Contact form not working?
- ✅ Verify API URL in frontend
- ✅ Check CORS allows your domain
- ✅ Check browser console (F12)

---

## 📚 Resources

- **Vercel Custom Domains:** https://vercel.com/docs/concepts/projects/domains
- **Namecheap DNS:** https://www.namecheap.com/support/knowledgebase/article.aspx/767/10
- **GoDaddy DNS:** https://www.godaddy.com/help/manage-dns-records-680

---

## 🎉 You're Done!

Your website is now live at:
- **Frontend:** `https://anandjha.com`
- **Backend:** `https://api.anandjha.com` (or Render URL)

**Professional, custom domain website!** 🚀


