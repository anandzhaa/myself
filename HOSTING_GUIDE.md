# Website Hosting Guide

Complete guide to host your portfolio website online for FREE!

## 🚀 Quick Overview

Your website has 2 parts:
1. **Frontend** (React website) - Needs hosting
2. **Backend** (Node.js server) - Needs hosting
3. **Database** (MongoDB) - Already using MongoDB Atlas (cloud)

---

## Option 1: FREE Hosting (Recommended for Beginners)

### Frontend: Vercel (FREE & Easiest)

**Why Vercel?**
- ✅ Completely FREE
- ✅ Automatic deployments
- ✅ Fast CDN
- ✅ Easy setup (5 minutes)

**Steps:**

1. **Build your frontend:**
   ```bash
   npm run build
   ```

2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will ask for project settings (just press Enter for defaults)
   - Done! You'll get a URL like: `your-site.vercel.app`

4. **Or use Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy!

**Your frontend will be live at:** `https://your-site.vercel.app`

---

### Backend: Render (FREE)

**Why Render?**
- ✅ FREE tier available
- ✅ Easy MongoDB connection
- ✅ Auto-deploys from GitHub

**Steps:**

1. **Push code to GitHub:**
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

4. **Configure:**
   - **Name:** `portfolio-backend`
   - **Environment:** `Node`
   - **Build Command:** (leave empty)
   - **Start Command:** `node server/index.js`
   - **Root Directory:** (leave empty)

5. **Add Environment Variables:**
   - Click "Environment"
   - Add:
     ```
     PORT=10000
     MONGODB_URI=your_mongodb_atlas_connection_string
     NODE_ENV=production
     ```

6. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes
   - Your backend will be live!

**Your backend will be at:** `https://portfolio-backend.onrender.com`

7. **Update Frontend:**
   - In `src/App.tsx`, change:
   ```typescript
   // Change this:
   'http://localhost:5000/api/contact'
   
   // To your Render URL:
   'https://portfolio-backend.onrender.com/api/contact'
   ```
   - Rebuild and redeploy frontend

---

## Option 2: Alternative FREE Hosting

### Frontend Alternatives:

1. **Netlify** (FREE)
   - Similar to Vercel
   - Visit [netlify.com](https://netlify.com)
   - Drag & drop your `dist` folder
   - Or connect GitHub

2. **GitHub Pages** (FREE)
   - For static sites
   - Requires some configuration

### Backend Alternatives:

1. **Railway** (FREE tier)
   - Visit [railway.app](https://railway.app)
   - Similar to Render

2. **Fly.io** (FREE tier)
   - Visit [fly.io](https://fly.io)
   - Good for Node.js apps

---

## Option 3: Paid Hosting (For Production)

### Recommended:
- **Frontend:** Vercel Pro ($20/month) or Netlify Pro
- **Backend:** AWS, DigitalOcean, or Heroku
- **Database:** MongoDB Atlas (already free tier available)

---

## 📋 Pre-Deployment Checklist

### 1. Update API URLs

In `src/App.tsx`, replace localhost with your backend URL:

```typescript
// Find this line:
const response = await fetch('http://localhost:5000/api/contact', {

// Replace with your Render/Railway URL:
const response = await fetch('https://your-backend.onrender.com/api/contact', {
```

### 2. Update CORS (if needed)

In `server/index.js`, update CORS:

```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### 3. Environment Variables

Make sure your `.env` file has:
```
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 4. Build Frontend

```bash
npm run build
```

This creates a `dist` folder with optimized files.

---

## 🎯 Step-by-Step: Complete Deployment

### Step 1: Prepare MongoDB Atlas

1. Make sure MongoDB Atlas is set up
2. Whitelist `0.0.0.0/0` (allow all IPs) in Network Access
3. Get your connection string

### Step 2: Deploy Backend (Render)

1. Push code to GitHub
2. Go to Render.com
3. Create Web Service
4. Add environment variables
5. Deploy

### Step 3: Deploy Frontend (Vercel)

1. Update API URL in `src/App.tsx`
2. Build: `npm run build`
3. Deploy to Vercel
4. Done!

### Step 4: Test

1. Visit your frontend URL
2. Submit contact form
3. Check MongoDB Atlas to see the data

---

## 🔧 Troubleshooting

### Backend not connecting to MongoDB
- ✅ Check MongoDB Atlas IP whitelist
- ✅ Verify connection string in environment variables
- ✅ Check Render logs for errors

### Frontend can't reach backend
- ✅ Update CORS in backend
- ✅ Check backend URL in frontend code
- ✅ Verify backend is running (check Render dashboard)

### Contact form not working
- ✅ Check browser console (F12)
- ✅ Verify backend URL is correct
- ✅ Check network tab for API calls

---

## 📱 Custom Domain (Optional)

### Add Your Own Domain:

1. **Buy domain:** Namecheap, GoDaddy, etc.
2. **Vercel:**
   - Go to Project Settings
   - Add domain
   - Update DNS records
3. **Backend:**
   - Render supports custom domains (paid)
   - Or use subdomain

---

## 💰 Cost Breakdown

### FREE Option:
- Frontend (Vercel): **FREE**
- Backend (Render): **FREE** (with limitations)
- Database (MongoDB Atlas): **FREE** (512MB)
- **Total: $0/month**

### Paid Option (Recommended for Production):
- Frontend (Vercel Pro): $20/month
- Backend (Render): $7/month
- Database (MongoDB Atlas): FREE or $9/month
- **Total: ~$27-36/month**

---

## 🎉 Quick Start Commands

```bash
# 1. Build frontend
npm run build

# 2. Deploy to Vercel
vercel

# 3. Or use Vercel dashboard (easier)
# Just connect GitHub repo
```

---

## 📚 Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas

---

**Recommended:** Start with FREE options (Vercel + Render) to test everything, then upgrade if needed!

