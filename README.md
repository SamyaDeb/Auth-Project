🔐 Auth App — MERN Stack (JWT + Email Verification + Reset Password)

![Static Badge](https://img.shields.io/badge/Node.js-green) ![Static Badge](https://img.shields.io/badge/Express.js-gray) ![Static Badge](https://img.shields.io/badge/React-blue) ![Static Badge](https://img.shields.io/badge/MongoDB%20-green) ![Static Badge](https://img.shields.io/badge/Tailwind%20CSS-cyan) ![Static Badge](https://img.shields.io/badge/JWT%20-%20yellow) ![Static Badge](https://img.shields.io/badge/Nodemailer%20-%20orange) ![Static Badge](https://img.shields.io/badge/Vite%20-(purple)) ![Static Badge](https://img.shields.io/badge/Axios%20%20-blue)
 ![Static Badge](https://img.shields.io/badge/React%20Router-%20red) ![Static Badge](https://img.shields.io/badge/dotenv%20-green) ![Static Badge](https://img.shields.io/badge/cookie-parser%20-orange)
![Static Badge](https://img.shields.io/badge/cors%20-blue) ![Static Badge](https://img.shields.io/badge/bcryptjs%20-yellow) ![Static Badge](https://img.shields.io/badge/JavaScript%20-yellow) ![Static Badge](https://img.shields.io/badge/GitHub%20-black) ![Static Badge](https://img.shields.io/badge/Vercel%20-blue) ![Static Badge](https://img.shields.io/badge/Render%20-blueviolet)

A complete authentication system built using the MERN stack — featuring JWT authentication, email verification, secure cookie-based login, and password reset functionality.
This project includes a fully connected frontend (React + Vite) and backend (Express + MongoDB) with deployment on Vercel and Render.

---

## 🚀 Features

✅ User Registration & Login
🔒 Password Hashing using bcryptjs
📧 Email OTP Verification via Nodemailer
🪶 JWT Authentication using Cookies
⚙️ Protected Routes (Middleware)
🔑 Forget / Reset Password via OTP
🌍 Deployed Frontend & Backend (CORS Configured)
🧩 Modular Folder Structure (Controller, Routes, Middleware) 

---

## 🧰 Tech Stack

**Frontend:**  
- React (Vite)
- Axios
- React Router DOM
- Tailwind CSS
- React Toastify  

**Backend:**  
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT (jsonwebtoken)  
- Nodemailer  
- dotenv  
- cookie-parser  
- cors  

---

## 📁 Folder Structure

AUTH-APP/
│
├── client/ # Frontend
│ ├── src/ # React source code
│ ├── public/
│ ├── .env
│ ├── vite.config.js
│ └── package.json
│
├── server/ # Backend
│ ├── config/ # MongoDB connection
│ ├── controller/ # authController.js, userController.js
│ ├── middleware/ # JWT verification, etc.
│ ├── model/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── .env
│ ├── server.js
│ └── package.json
│
└── README.md

---

## ⚙️ Environment Variables

**Frontend (.env)
VITE_BACKEND_URL=https://auth-app-1oqm.vercel.app

**Backend (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
FRONTEND_URL=https://auth-app-delta-three.vercel.app

--- 

🧪 API Endpoints

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/api/auth/register`   | Register new user         |
| POST   | `/api/auth/login`      | Login user                |
| POST   | `/api/auth/send-otp`   | Send verification OTP     |
| POST   | `/api/auth/verify-otp` | Verify OTP                |
| GET    | `/api/auth/is-auth`    | Check user authentication |
| GET    | `/api/user/profile`    | Fetch user profile        |


---

🚀 Deployment

Frontend: Vercel(auth-app-delta-three.vercel.app)
Backend: Vercel(https://auth-app-1oqm.vercel.app/)

---

🖼️ Screenshots

Home Page
<img width="1894" height="911" alt="image" src="https://github.com/user-attachments/assets/3d1c92d6-8246-42bd-abc0-3bb1308b0e57" />
Login Page
<img width="582" height="612" alt="image" src="https://github.com/user-attachments/assets/5e0af9ed-7ff4-43d3-8ad1-58967cb917ad" />           
Register Page
<img width="588" height="725" alt="image" src="https://github.com/user-attachments/assets/fbf671cf-a743-48b9-8a8f-d2e645de9303" />      


---

🧑‍💻 Run Locally

# Clone the repo
git clone https://github.com/Akash504-ai/AUTH-app.git

# Navigate into project
cd AUTH-app

# Install dependencies
cd server && npm install
cd ../client && npm install

# Run backend
cd server
npm start

# Run frontend
cd ../client
npm run dev

Then open → http://localhost:5173

---

🌟 Learning Outcomes

Through this project, I learned:

How to connect Frontend and Backend securely

How to use CORS, cookies, and JWT for authentication

How to implement email verification using Nodemailer

How to deploy full-stack apps using Vercel and Render

---

🧑‍🎓 Author

Akash Santra
Full-Stack Developer 🚀
