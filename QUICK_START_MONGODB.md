# Quick Start: MongoDB Setup for Contact Form

## 🚀 Fastest Way: MongoDB Atlas (Free Cloud Database)

### Step 1: Create Account (2 minutes)
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Sign up with email (free forever)
3. Verify your email

### Step 2: Create Database (3 minutes)
1. Click "Build a Database"
2. Choose **FREE** (M0 Sandbox)
3. Click "Create"
4. Wait 3-5 minutes

### Step 3: Setup Access (2 minutes)
1. **Create User:**
   - Go to "Database Access" → "Add New Database User"
   - Username: `portfolio_user`
   - Password: Create a strong password (save it!)
   - Click "Add User"

2. **Whitelist IP:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

### Step 4: Get Connection String (1 minute)
1. Go to "Database" → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
   - It looks like: `mongodb+srv://portfolio_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 5: Create .env File (1 minute)
1. Create file: `server/.env`
2. Add this (replace with YOUR password and cluster name):
```
PORT=5000
MONGODB_URI=mongodb+srv://portfolio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Important:** Replace:
- `YOUR_PASSWORD` with the password you created
- `cluster0.xxxxx` with your actual cluster name

### Step 6: Start Server
```bash
npm run server
```

You should see: ✅ **"MongoDB connected successfully"**

---

## 📊 View Contact Submissions

### Method 1: Browser (Easiest)
Open: `http://localhost:5000/api/contacts`
- Shows all submissions in JSON format

### Method 2: MongoDB Atlas Dashboard
1. Go to MongoDB Atlas
2. Click "Browse Collections"
3. Select `portfolio` database
4. View `contacts` collection
5. See all messages with dates

### Method 3: Admin Page
1. Create `admin.html` in root folder (see instructions below)
2. Or access via: `http://localhost:5173/admin.html`

---

## 🔧 Troubleshooting

### "MongoDB connection error"
- ✅ Check `.env` file exists in `server` folder
- ✅ Verify password is correct (no extra spaces)
- ✅ Check IP is whitelisted in Atlas
- ✅ Make sure cluster is fully created (wait 5 minutes)

### "Network error" when submitting form
- ✅ Backend server running? (`npm run server`)
- ✅ See "MongoDB connected successfully" message?
- ✅ Check browser console (F12) for errors

### Connection String Format
```
✅ Correct: mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
❌ Wrong: mongodb://username:password@cluster.mongodb.net
```

---

## 📝 What Gets Stored?

Every contact form submission saves:
- **Name** - Visitor's name
- **Email** - Visitor's email
- **Message** - Their message
- **CreatedAt** - Automatic timestamp

All stored in: Database `portfolio` → Collection `contacts`

---

## 🎯 Test It!

1. Start backend: `npm run server`
2. Start frontend: `npm run dev`
3. Go to contact form
4. Submit a test message
5. Check: `http://localhost:5000/api/contacts`
6. You should see your test message! 🎉

