# MongoDB Compass Setup Guide

Since you have MongoDB Compass, you're using **local MongoDB**. Here's how to set it up:

## Step 1: Start MongoDB Service

### On Windows:
1. Open **Services** (Press `Win + R`, type `services.msc`, press Enter)
2. Find **MongoDB** service
3. Right-click → **Start** (if not running)
4. Or open Command Prompt as Administrator and run:
   ```
   net start MongoDB
   ```

### Verify MongoDB is Running:
- Open MongoDB Compass
- If it connects, MongoDB is running ✅
- Default connection: `mongodb://localhost:27017`

## Step 2: Create .env File

1. Create a file named `.env` in the `server` folder
2. Add this content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**That's it!** This connects to your local MongoDB.

## Step 3: Start Your Backend Server

```bash
npm run server
```

You should see:
```
✅ MongoDB connected successfully
✅ Server is running on port 5000
```

## Step 4: View Contact Data in MongoDB Compass

### Connect to Database:
1. Open **MongoDB Compass**
2. Connect to: `mongodb://localhost:27017`
3. You'll see your databases

### Find Your Data:
1. Look for database named: **`portfolio`**
2. Click on it
3. You'll see collection: **`contacts`**
4. Click on `contacts` collection
5. **See all your contact form submissions!** 🎉

### What You'll See:
Each document (contact submission) contains:
- `_id` - Unique ID
- `name` - Visitor's name
- `email` - Visitor's email
- `message` - Their message
- `createdAt` - Timestamp

## Step 5: Test the Contact Form

1. Start backend: `npm run server`
2. Start frontend: `npm run dev`
3. Go to your website
4. Fill out the contact form
5. Submit it
6. **Refresh MongoDB Compass** → See your new submission appear!

## Troubleshooting

### "MongoDB connection error"
- ✅ Check if MongoDB service is running
- ✅ Verify `.env` file exists in `server` folder
- ✅ Check connection string: `mongodb://localhost:27017/portfolio`
- ✅ Try connecting in MongoDB Compass first

### MongoDB Compass won't connect
- ✅ Make sure MongoDB service is started
- ✅ Check if port 27017 is not blocked by firewall
- ✅ Restart MongoDB service

### Contact form not saving
- ✅ Backend server running? (`npm run server`)
- ✅ See "MongoDB connected successfully" message?
- ✅ Check browser console (F12) for errors

## Quick Commands

```bash
# Start MongoDB (if not running as service)
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check MongoDB status
sc query MongoDB
```

## View Data in Compass

1. **Open MongoDB Compass**
2. **Connect** to `mongodb://localhost:27017`
3. **Click** on `portfolio` database
4. **Click** on `contacts` collection
5. **See all submissions** with dates, names, emails, and messages!

---

**That's it!** Your contact form data will automatically save to MongoDB and you can view it in Compass! 🚀

