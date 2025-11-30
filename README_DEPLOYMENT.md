# Deployment Instructions

## 🎯 Quick Summary

**FREE Hosting Options:**
- **Frontend:** Vercel (FREE) - Best for React apps
- **Backend:** Render (FREE) - Best for Node.js
- **Database:** MongoDB Atlas (FREE) - Already set up

**Total Cost: $0/month** ✅

---

## 📋 Before Deploying

### 1. Update Backend URL

Before deploying, update the API URL in your frontend:

**File:** `src/App.tsx`

Find this line (around line 51):
```typescript
const response = await fetch('http://localhost:5000/api/contact', {
```

**After deploying backend, change to:**
```typescript
const response = await fetch('https://your-backend.onrender.com/api/contact', {
```

### 2. Update CORS in Backend

**File:** `server/index.js`

Update CORS to allow your frontend domain:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'http://localhost:5173'  // Keep for local development
  ],
  credentials: true
}));
```

---

## 🚀 Deployment Steps

### Frontend Deployment (Vercel)

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Build your project
npm run build

# Deploy
vercel
```

**Option B: Using Vercel Dashboard (Easier)**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"
7. Wait 2 minutes
8. **Done!** You'll get a URL

---

### Backend Deployment (Render)

1. **Push code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Render:**
   - Visit [render.com](https://render.com)
   - Sign up (FREE)
   - Click "New +" → "Web Service"

3. **Connect GitHub:**
   - Select your repository
   - Choose branch: `main`

4. **Configure Service:**
   - **Name:** `portfolio-backend`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** (leave empty)
   - **Build Command:** (leave empty)
   - **Start Command:** `node server/index.js`

5. **Add Environment Variables:**
   - Click "Environment" tab
   - Add these:
     ```
     PORT=10000
     MONGODB_URI=your_mongodb_atlas_connection_string
     NODE_ENV=production
     ```

6. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - Your backend will be live!

7. **Get Your Backend URL:**
   - After deployment, you'll see: `https://portfolio-backend.onrender.com`
   - Copy this URL

8. **Update Frontend:**
   - Update `src/App.tsx` with your backend URL
   - Rebuild and redeploy frontend

---

## 🔗 Connect Frontend to Backend

1. **Update API URL in Frontend:**
   ```typescript
   // src/App.tsx - Line ~51
   const response = await fetch('https://your-backend.onrender.com/api/contact', {
   ```

2. **Update CORS in Backend:**
   ```javascript
   // server/index.js
   app.use(cors({
     origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
     credentials: true
   }));
   ```

3. **Redeploy Both:**
   - Push changes to GitHub
   - Vercel auto-deploys
   - Render auto-deploys

---

## ✅ Testing

1. Visit your Vercel URL
2. Fill out the contact form
3. Submit
4. Check MongoDB Atlas → Browse Collections → `portfolio` → `contacts`
5. You should see the submission!

---

## 🐛 Troubleshooting

### Backend not working?
- Check Render logs (in dashboard)
- Verify environment variables
- Check MongoDB Atlas connection

### Frontend can't reach backend?
- Check CORS settings
- Verify backend URL is correct
- Check browser console (F12)

### MongoDB connection failed?
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0)
- Verify connection string
- Check environment variables in Render

---

## 📱 Custom Domain (Optional)

### Add Your Own Domain:

1. **Buy domain** (Namecheap, GoDaddy, etc.)

2. **Vercel:**
   - Go to Project Settings → Domains
   - Add your domain
   - Update DNS records as shown

3. **Backend:**
   - Render supports custom domains (requires paid plan)
   - Or use subdomain

---

## 💡 Pro Tips

1. **Use Environment Variables:**
   - Don't hardcode URLs
   - Use `.env` files for local development
   - Use platform environment variables for production

2. **Auto-Deploy:**
   - Connect GitHub to both Vercel and Render
   - Every push = automatic deployment!

3. **Monitor:**
   - Check Vercel analytics
   - Monitor Render logs
   - Set up MongoDB Atlas alerts

---

## 📚 Resources

- **Vercel:** https://vercel.com/docs
- **Render:** https://render.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

---

**Need help?** Check the detailed guides:
- `HOSTING_GUIDE.md` - Complete hosting options
- `DEPLOY_QUICK_START.md` - 5-minute quick start


