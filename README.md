# Kenmark-NotesApp-Kaushal

This is a full-stack **Notes Dashboard** application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It supports user authentication, light/dark mode toggle, and CRUD operations for personal notes.

## 🔗 Live Links

- **Frontend**: [https://kaushal-notes-app.vercel.app](https://kaushal-notes-app.vercel.app)
- **Backend**: [https://kaushal-notesapp-backend.onrender.com](https://kaushal-notesapp-backend.onrender.com)

---

## 🚀 Features

- 🔐 JWT-based Authentication with cookies
- 🌗 Light & Dark mode toggle
- 🧠 Create, read, update, and delete personal notes
- ✅ Protected routes
- 🧭 Framer Motion animations
- 🌍 CORS-enabled for frontend-backend communication

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- cookie-parser
- CORS

---


📁 Folder Structure

├── backend
│   ├── routes
│   ├── controllers
│   ├── models
│   ├── lib
│   └── server.js
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   ├── App.jsx
│   └── main.jsx


🧠 Design Decisions & Implementation Approach

MERN Stack: Chosen for its powerful full-stack capabilities using JavaScript end-to-end. React enables a responsive UI, and Node/Express with MongoDB offer scalable backend data handling.

Component-Based Architecture: React components are modular and reusable. Forms, protected routes, dashboards, and note cards are broken down for better readability and maintenance.

Authentication with Cookies: JWT tokens are stored in HTTP-only cookies to improve security and maintain persistent sessions.

CORS & Backend Integration: CORS is configured to allow secure cross-origin requests between the Vercel-deployed frontend and the Render-deployed backend.

Framer Motion: Used for smooth animations on form transitions and interactions, enhancing user experience.

Tailwind CSS: Used for fast styling and responsive design with utility-first classes. Supports dark mode easily with Tailwind’s built-in dark class.

Protected Routing: React Router and context are used to manage auth state and protect routes from unauthorized access.

Deployment: Vercel and Render were selected for their ease of deployment, CI/CD integration, and free tier support.
