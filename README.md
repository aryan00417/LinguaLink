🌍 LinguaLink

🔗 Live Website: https://lingua-link-rho.vercel.app

LinguaLink is a real-time AI-powered communication and language exchange platform where users from different countries connect, chat, video call, and break language barriers with the help of an AI assistant built directly into conversations.

Users select their native language and the language they want to learn, discover compatible users, and communicate through real-time chat and video calls.
Lingua AI enhances conversations with translation, summaries, and smart replies, making global communication seamless.

🚀 Features

🌐 Language-Based Matching

Users select native and learning languages

Platform suggests compatible users for conversation practice

Helps build global friendships and language exchange partnerships

💬 Real-Time Chat

Instant 1-to-1 messaging using Stream Chat

Typing indicators and online presence

AI assistant integrated directly into chat channels

🎥 Instant Video Calls

Start video calls with one click

Call links automatically shared in chat

Real-time communication experience

🤖 Lingua AI Assistant (Built Into Chat)

AI participates in conversations as a real chat member

Trigger AI anytime using @ai

Context-aware responses using recent chat history

🧠 AI Features

🌍 AI Translation

Translate messages instantly inside conversations

Example:

@ai translate: Hello → Spanish

Helps users communicate across language barriers

🧠 Conversation Summarization

Summarizes long chats into key bullet points

Perfect for meetings or long discussions

Example:

@ai summarize

💡 Smart Reply Suggestions

AI suggests replies to the last message

Similar to Gmail/WhatsApp smart replies

Example:

@ai reply

💬 AI Chat Assistant

Ask questions or get help directly in conversations

AI understands recent chat context before responding

⚙️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

TanStack Query

Stream Chat React SDK

Backend

Node.js

Express.js

MongoDB Atlas

Stream Chat Server SDK

AI & Real-Time Infrastructure

OpenRouter (LLM gateway)

GPT-4o Mini

Stream Webhooks (Event-Driven Architecture)

Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

🏗️ Architecture Overview

LinguaLink uses an event-driven AI architecture:

User sends a message in chat

Stream Chat triggers a webhook

Backend receives the event

Backend fetches recent chat messages (context)

Context is sent to the AI model

AI generates a response

Backend sends AI reply back to the chat channel

This makes Lingua AI feel like a real participant in conversations.

🔐 Authentication & Security

Secure JWT authentication

Protected API routes

Environment variables for sensitive keys

Backend validation and secure token handling

🧩 Getting Started Locally
1️⃣ Clone the repository
git clone https://github.com/yourusername/lingualink.git
2️⃣ Install dependencies
cd backend && npm install
cd frontend && npm install
3️⃣ Setup environment variables

Backend .env

MONGO_URI=
JWT_SECRET=
STREAM_API_KEY=
STREAM_API_SECRET=
OPENAI_API_KEY=

Frontend .env

VITE_STREAM_API_KEY=
4️⃣ Run the app
npm run dev
🎯 Project Vision

LinguaLink demonstrates how AI can be integrated into real-time communication platforms to remove language barriers and enhance human conversations.

👨‍💻 Author

Built as a full-stack MERN + AI project.
If you like the project, consider giving it a ⭐ on GitHub!
