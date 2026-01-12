🌍 LinguaLink

🔗 Live Demo: https://lingua-link-rho.vercel.app

LinguaLink is a real-time language learning and social connection platform where people from different countries and language backgrounds come together to learn new languages directly from native speakers.

The platform matches users based on their native language and learning language, allowing them to connect, chat, and practice through text and video calls, while also making meaningful global friendships.

🚀 Key Features

🌐 Language-based User Matching

Users select a native language and a language they want to learn

Platform intelligently suggests users with complementary language preferences

🔐 Secure Authentication

JWT-based authentication using HTTP-only cookies

Sessions persist securely across refreshes

💬 Real-time Chat

One-to-one messaging with instant updates

Smooth and responsive chat experience

🎥 Video Calling

Real-time video communication for language practice

Helps users improve pronunciation and conversational skills

🤝 Social Learning

Learn languages naturally by talking to real people

Build friendships across cultures and countries

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS & DaisyUI

Axios

React Query

Backend

Node.js

Express.js

MongoDB Atlas

JWT Authentication (Cookie-based)

Services & Deployment

Stream (Chat & Video)

Vercel (Frontend Deployment)

Render (Backend Deployment)

🧠 Architecture Overview

Monorepo structure with separate frontend and backend

Frontend and backend deployed on different platforms

Proper handling of:

CORS

Secure cookies (sameSite: none, secure: true)

Environment-based configuration

This setup closely mirrors real-world production systems.

📁 Project Structure
LinguaLink/
├── frontend/        # React (Vite) frontend
│   ├── src/
│   └── dist/
│
├── backend/         # Express backend
│   ├── src/
│   ├── routes/
│   └── controllers/
│
└── README.md

⚙️ Environment Variables
Backend (Render)
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret
NODE_ENV=production

Frontend (Vercel)
VITE_API_URL=https://your-backend-url.onrender.com/api

🧪 Running Locally
Clone the repository
git clone https://github.com/aryan00417/LinguaLink.git
cd LinguaLink

Start Backend
cd backend
npm install
npm start

Start Frontend
cd frontend
npm install
npm run dev


Frontend → http://localhost:5173

Backend → http://localhost:5001

🔐 Authentication & Security Notes

Authentication handled via HTTP-only cookies

Cross-domain deployment handled using:

sameSite: "none"

secure: true

Logout correctly clears cookies with matching options

📌 Important Behaviour

A single device camera can only be used by one browser at a time

To test video calls:

Use different devices

Or use incognito / different accounts

This is expected WebRTC behaviour.

🎯 Why LinguaLink?

LinguaLink is designed to solve a real problem:

Language learning is most effective when done through real conversations.

Instead of static lessons, users learn by:

Talking to native speakers

Practicing in real scenarios

Building global connections

The project demonstrates full-stack development skills, real deployment experience, and production-level problem solving.

👤 Author

Aryan Kumar
GitHub: https://github.com/aryan00417
