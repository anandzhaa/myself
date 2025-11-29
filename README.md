# Portfolio Resume Website

A modern, attractive resume website built with React, TypeScript, Tailwind CSS, Express, and MongoDB.

## Features

- 🎨 Modern and attractive design with gradient effects
- 📱 Fully responsive layout
- 👤 Profile picture support
- 💼 Frontend & Backend Developer profile
- 📧 Contact form with MongoDB backend
- ⚡ Fast and optimized

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Profile Picture

Place your profile picture in the `public` folder and name it `profile.jpg` (or update the path in `src/App.tsx`).

Supported formats: `.jpg`, `.jpeg`, `.png`

### 3. Setup MongoDB

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. Create a `.env` file in the `server` folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and database
3. Get your connection string
4. Create a `.env` file in the `server` folder:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 4. Run the Application

#### Start Backend Server (Terminal 1)
```bash
npm run server
```

#### Start Frontend Development Server (Terminal 2)
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5000`

## Project Structure

```
myself/
├── public/              # Static files (profile picture goes here)
├── server/              # Backend server
│   ├── index.js        # Express server with MongoDB
│   └── .env           # Environment variables (create this)
├── src/
│   ├── App.tsx        # Main React component
│   ├── index.css      # Global styles
│   └── main.tsx       # React entry point
└── package.json       # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:server` - Start backend with auto-reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contact Form API

### POST /api/contact
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in working with you."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "data": { ... }
}
```

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Icons:** Lucide React

## Notes

- Make sure MongoDB is running before starting the backend server
- The contact form requires the backend server to be running
- Profile picture should be placed in the `public` folder

