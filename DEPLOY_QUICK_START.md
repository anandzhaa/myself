# Quick Deployment Guide (5 Minutes)

## 🚀 Fastest Way to Go Live

### Step 1: Deploy Frontend (Vercel) - 2 minutes

1. **Build your site:**
   ```bash
   npm run build
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up with GitHub
   - Click "Add New Project"
   - Import your repository
   - Click "Deploy"
   - **Done!** You'll get a URL like: `your-site.vercel.app`

### Step 2: Deploy Backend (Render) - 3 minutes

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push
   ```

2. **Go to [render.com](https://render.com)**
   - Sign up (FREE)
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Settings:
     - **Name:** `portfolio-backend`
     - **Start Command:** `node server/index.js`
   - Add Environment Variables:
     ```
     PORT=10000
     MONGODB_URI=your_mongodb_atlas_connection_string
     ```
   - Click "Create Web Service"
   - Wait 5 minutes
   - **Done!** You'll get: `your-backend.onrender.com`

### Step 3: Connect Frontend to Backend

1. **Update `src/App.tsx`:**
   ```typescript
   // Find this line (around line 51):
   const response = await fetch('http://localhost:5000/api/contact', {
   
   // Change to:
   const response = await fetch('https://your-backend.onrender.com/api/contact', {
   ```

2. **Rebuild and redeploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Update backend URL"
   git push
   ```
   - Vercel will auto-deploy!

### Step 4: Test

1. Visit your Vercel URL
2. Fill out contact form
3. Check MongoDB Atlas to see the data!

---

## ✅ That's It!

Your website is now live on the internet! 🎉

**Frontend:** `https://your-site.vercel.app`  
**Backend:** `https://your-backend.onrender.com`

---

## 🔧 Need Help?

- **Vercel Issues:** Check deployment logs in Vercel dashboard
- **Backend Issues:** Check logs in Render dashboard
- **MongoDB Issues:** Check MongoDB Atlas connection string

