# MongoDB Setup Guide for Contact Form

## Option 1: MongoDB Atlas (Cloud - Recommended & Free)

### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up (it's completely free)
3. Verify your email

### Step 2: Create a Cluster
1. After login, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (choose closest to you)
4. Click "Create"
5. Wait 3-5 minutes for cluster to be created

### Step 3: Create Database User
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username (e.g., `portfolio_user`)
5. Enter a strong password (save it!)
6. Set user privileges to "Atlas admin" or "Read and write to any database"
7. Click "Add User"

### Step 4: Whitelist Your IP
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development) or add your IP
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)

### Step 6: Create .env File
1. Create a file named `.env` in the `server` folder
2. Add this content:
```
PORT=5000
MONGODB_URI=mongodb+srv://portfolio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```
3. Replace:
   - `portfolio_user` with your database username
   - `YOUR_PASSWORD` with your database password
   - `cluster0.xxxxx` with your actual cluster name

### Step 7: Test Connection
1. Start your backend server: `npm run server`
2. You should see: "MongoDB connected successfully"
3. If you see an error, check your connection string

---

## Option 2: Local MongoDB

### Step 1: Install MongoDB
1. Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install MongoDB Community Server
3. During installation, check "Install MongoDB as a Service"

### Step 2: Start MongoDB
1. MongoDB should start automatically as a service
2. Or start manually: Open Command Prompt as Administrator and run:
   ```
   net start MongoDB
   ```

### Step 3: Create .env File
1. Create a file named `.env` in the `server` folder
2. Add this content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

### Step 4: Test Connection
1. Start your backend server: `npm run server`
2. You should see: "MongoDB connected successfully"

---

## How Contact Data is Stored

When someone submits the contact form:
- **Name** - stored as string
- **Email** - stored as string (lowercase)
- **Message** - stored as string
- **CreatedAt** - automatically added timestamp

All data is saved in MongoDB database named `portfolio`, collection named `contacts`.

---

## Viewing Contact Submissions

### Method 1: Using API Endpoint
Visit in browser: `http://localhost:5000/api/contacts`
This will show all contact submissions in JSON format.

### Method 2: Using MongoDB Atlas
1. Go to your MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Select `portfolio` database
4. View `contacts` collection
5. See all submitted contact forms

### Method 3: Using Admin Page (See below)

---

## Troubleshooting

### "MongoDB connection error"
- Check if `.env` file exists in `server` folder
- Verify connection string is correct
- For Atlas: Check if IP is whitelisted
- For Local: Check if MongoDB service is running

### "Network error" when submitting form
- Make sure backend server is running (`npm run server`)
- Check if MongoDB is connected (look for "MongoDB connected successfully")
- Verify CORS is enabled (already in code)

### Connection String Format
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`
- Local: `mongodb://localhost:27017/portfolio`

