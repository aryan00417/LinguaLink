# 🌍 LinguaLink

🔗 **Live Website:** https://lingua-link-rho.vercel.app  

LinguaLink is a **real-time language learning and social interaction platform** where people from different nationalities and language backgrounds connect to learn languages directly from **native speakers**.

Users select their **native language** and the **language they want to learn**, based on which the platform suggests compatible users. They can then connect via **chat and video calls**, practice languages, and build global friendships.

---

## 🚀 Features

- 🌐 **Language-Based Matching**
  - Users choose a native language and a learning language
  - Smart user suggestions based on language compatibility

- 🔐 **Secure Authentication**
  - JWT-based authentication
  - Stored securely using HTTP-only cookies

- 💬 **Real-Time Chat**
  - One-to-one messaging
  - Instant updates with a smooth UI

- 🎥 **Video Calling**
  - Real-time video calls for language practice
  - Helps improve pronunciation and conversational skills

- 🤝 **Social Learning**
  - Learn languages through real conversations
  - Meet people and make friends across cultures

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS & DaisyUI
- Axios
- React Query

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication (Cookie-based)

### Services & Deployment
- Stream (Chat & Video)
- Vercel (Frontend)
- Render (Backend)

---

## 🧠 Architecture Overview

- Monorepo structure with separate frontend and backend
- Frontend and backend deployed on different platforms
- Proper handling of:
  - CORS
  - Secure cookies (`sameSite: none`, `secure: true`)
  - Environment-based configuration

This setup closely follows **real-world production architecture**.

---

## 📁 Project Structure

```text
LinguaLink/
├── frontend/        # React frontend (Vite)
│   ├── src/
│   └── dist/
│
├── backend/         # Express backend
│   ├── src/
│   ├── routes/
│   └── controllers/
│
└── README.md

