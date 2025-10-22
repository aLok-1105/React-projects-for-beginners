# 🌟 BuzzHub – Connect, Create, and Celebrate Events

**BuzzHub** is a full-stack MERN platform where users can **create**, **explore**, and **join events** seamlessly.  
It’s designed to bring communities together by making event management simple, social, and accessible.

---

## 🚀 Overview

BuzzHub allows users to:
- ✨ Create and manage their own events
- 📍 Explore events by category, location, and date
- 🧊 Upload custom event posters
- 👥 Join events and see who’s attending
- 🔐 Securely register and log in
- 🧾 View personalized profiles and track participation

Built using the **MERN Stack (MongoDB, Express, React, Node.js)**, BuzzHub focuses on clean UI, accessibility, and modern event discovery.

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, React Router, Tailwind / CSS Modules |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT (JSON Web Token) |
| **File Uploads** | Multer (for event posters) |
| **API Testing** | Postman |
| **Deployment** | Render / Vercel |

---

## ⚙️ Setup Instructions

### 🖥️ 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install

2. Create a .env file in the backend folder:
    MONGODB_URI=mongodb://localhost:27017/buzzhub
    JWT_SECRET=your_secret_key_here
    PORT=5000
    NODE_ENV=development


3. Start the backend server:
   npm run dev

💻 2. Frontend Setup

1.Move to the frontend directory:
    cd frontend
    npm install

2. Start the development server:
    npm run dev


3.Visit the app at:
   http://localhost:5173
