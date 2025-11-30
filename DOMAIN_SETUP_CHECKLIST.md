# Custom Domain Setup Checklist

## ✅ Step-by-Step Checklist

### 1. Domain Purchase
- [ ] Choose domain name (e.g., `anandjha.com`)
- [ ] Buy from Namecheap/GoDaddy/Google Domains
- [ ] Cost: ~$10-15/year
- [ ] Note: Domain registrar login details

### 2. Frontend Deployment
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Get Vercel URL: `your-site.vercel.app`
- [ ] Test frontend works

### 3. Add Custom Domain to Vercel
- [ ] Go to Vercel → Project → Settings → Domains
- [ ] Click "Add Domain"
- [ ] Enter: `anandjha.com`
- [ ] Enter: `www.anandjha.com`
- [ ] Copy DNS records shown by Vercel:
  - [ ] A Record IP address
  - [ ] CNAME value for www

### 4. Configure DNS at Registrar
- [ ] Login to domain registrar
- [ ] Go to DNS Management
- [ ] Add A Record:
  - Host: `@`
  - Value: `76.76.21.21` (from Vercel)
- [ ] Add CNAME Record:
  - Host: `www`
  - Value: `cname.vercel-dns.com` (from Vercel)
- [ ] Save changes

### 5. Backend Setup
- [ ] Deploy backend to Render
- [ ] Get Render URL: `portfolio-backend.onrender.com`
- [ ] Option A: Use subdomain
  - [ ] Add CNAME: `api` → `portfolio-backend.onrender.com`
- [ ] Option B: Use Render URL directly
  - [ ] No DNS changes needed

### 6. Update Code
- [ ] Update `src/App.tsx`:
  - [ ] Change API URL to custom domain or Render URL
- [ ] Update `server/index.js`:
  - [ ] Add custom domain to CORS
- [ ] Add environment variables:
  - [ ] `FRONTEND_URL=https://anandjha.com`
  - [ ] `CUSTOM_DOMAIN=https://anandjha.com`

### 7. Test & Verify
- [ ] Wait 5-60 minutes for DNS propagation
- [ ] Visit: `https://anandjha.com`
- [ ] Check SSL certificate (padlock icon)
- [ ] Test contact form
- [ ] Verify data saves to MongoDB
- [ ] Test on mobile device
- [ ] Test www version: `https://www.anandjha.com`

### 8. Final Checks
- [ ] Website loads correctly
- [ ] All pages work
- [ ] Contact form submits successfully
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SSL certificate active

---

## 📝 DNS Records Summary

For `anandjha.com`:

```
Type    Host    Value                          Purpose
----    ----    -----                          -------
A       @       76.76.21.21                    Root domain
CNAME   www     cname.vercel-dns.com           WWW subdomain
CNAME   api     portfolio-backend.onrender.com Backend API (optional)
```

---

## 🔗 Important URLs

After setup, you'll have:

- **Frontend:** `https://anandjha.com`
- **Frontend (www):** `https://www.anandjha.com`
- **Backend:** `https://api.anandjha.com` (or Render URL)

---

## 💰 Cost Summary

- Domain: $10-15/year
- Frontend (Vercel): FREE
- Backend (Render): FREE (or $7/month for custom domain)
- SSL: FREE (automatic)
- **Total:** ~$10-15/year

---

## 🆘 Need Help?

- **DNS not working?** Wait 24-48 hours, check DNS propagation
- **SSL not working?** Wait 5-10 minutes after DNS setup
- **Website not loading?** Check Vercel deployment status
- **Contact form not working?** Check CORS and API URL

---

**Time to Complete:** ~10-15 minutes  
**DNS Propagation:** 5-60 minutes  
**Total:** Your website live with custom domain! 🎉


