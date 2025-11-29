# Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Your Profile Picture
- Place your profile picture in the `public` folder
- Name it `profile.jpg` (or `.png`, `.jpeg`)
- The website will automatically use it

### 3. Setup MongoDB

#### For Local MongoDB:
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Create `server/.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

#### For MongoDB Atlas (Cloud - Recommended):
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Create a database user
5. Whitelist your IP (or use 0.0.0.0/0 for development)
6. Get your connection string
7. Create `server/.env` file:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```
Replace `username`, `password`, and `cluster` with your actual values.

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Access the Website
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running (for local)
- Check your connection string in `server/.env`
- Verify your IP is whitelisted (for Atlas)
- Check firewall settings

### Contact Form Not Working
- Make sure backend server is running
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

### Profile Picture Not Showing
- Check file name is exactly `profile.jpg`
- Verify file is in the `public` folder
- Check file format (jpg, jpeg, or png)

