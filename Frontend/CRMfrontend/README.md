# 🛠️ Customer Relation Management (CRM) System

A full-stack **MERN** application for managing customer support tickets, employees, and admin operations. Built with role-based access control, JWT authentication, Redis session management, and a responsive React frontend.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Role-Based Access](#role-based-access)
- [Authentication Flow](#authentication-flow)

---

## 🌐 Overview

This CRM system allows businesses to manage customer support tickets with three distinct user roles: **Admin**, **Employee**, and **User (Customer)**. Admins can create employee accounts, manage tickets, and monitor the system. Employees handle ticket responses. Users can submit and track their tickets.

---

## 🧰 Tech Stack

### Backend

| Technology         | Purpose                |
| ------------------ | ---------------------- |
| Node.js + Express  | REST API server        |
| MongoDB + Mongoose | Database & ODM         |
| Redis              | JWT session storage    |
| bcryptjs           | Password hashing       |
| jsonwebtoken       | Access & Refresh JWT   |
| nodemon            | Development hot-reload |
| dotenv             | Environment config     |

### Frontend

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| React 18        | UI framework            |
| Redux Toolkit   | Global state management |
| React Router v6 | Client-side routing     |
| Axios           | HTTP requests           |
| Vite            | Build tool & dev server |
| Tailwind CSS    | Utility-first styling   |

---

## 📁 Project Structure

```
CustomerRelationManagement/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection
│   │   ├── helper/
│   │   │   ├── bcryptHelper.js        # Password hash/compare
│   │   │   ├── emailHelper.js         # Email processor
│   │   │   ├── jwtHelper.js           # JWT create/verify
│   │   │   └── redisHelper.js         # Redis get/set/delete
│   │   ├── middleware/
│   │   │   ├── adminAuthorization.js  # Admin JWT guard
│   │   │   ├── adminOnly.js           # Role check middleware
│   │   │   ├── authorization.js       # User JWT guard
│   │   │   ├── formValidationMiddleware.js
│   │   │   └── roleBasedMiddleware.js
│   │   ├── models/
│   │   │   ├── admin/
│   │   │   │   ├── adminModel.js
│   │   │   │   └── adminSchema.js
│   │   │   ├── resetPin/
│   │   │   │   ├── ResetPinModel.js
│   │   │   │   └── ResetPinSchema.js
│   │   │   ├── Ticket/
│   │   │   │   ├── ticketModel.js
│   │   │   │   └── ticketSchema.js
│   │   │   └── user/
│   │   │       ├── userModel.js
│   │   │       └── userSchema.js
│   │   └── routers/
│   │       ├── adminRouter.js         # Admin auth routes
│   │       ├── newUserRouter.js       # Admin: create/manage employees
│   │       ├── ticketRouter.js        # Ticket CRUD
│   │       ├── tokensRouter.js        # JWT refresh
│   │       └── userRouter.js          # User auth routes
│   ├── .env
│   ├── package.json
│   └── server.js                      # App entry point
│
└── Frontend/CRMfrontend/
    ├── src/
    │   ├── api/
    │   │   ├── adminApi.js            # Admin API calls
    │   │   ├── employeeApi.js         # Employee management API
    │   │   ├── ticketApi.js           # Ticket API calls
    │   │   └── userApi.js             # User API calls
    │   ├── authBootstrap/
    │   │   └── authBootstrap.js       # Auto-login on app load
    │   ├── Component/
    │   │   ├── Navbar.jsx             # Global navbar with logout
    │   │   ├── Footer.jsx
    │   │   ├── PrivateRoute.jsx       # Route protection
    │   │   ├── Breadcrumb.jsx
    │   │   └── MessageHistory.jsx
    │   ├── page/
    │   │   ├── AdminDashboard.jsx     # Admin ticket management
    │   │   ├── AdminLogin.jsx
    │   │   ├── adminAction.js         # Admin Redux thunks
    │   │   ├── adminSlice.js          # Admin Redux slice
    │   │   ├── Dashboard.jsx          # User/Employee dashboard
    │   │   ├── Login.jsx
    │   │   ├── LoginSlice.js
    │   │   ├── ManageEmployee.jsx     # Admin: manage employees modal
    │   │   ├── Register.jsx
    │   │   ├── TicketListing.jsx
    │   │   ├── TicketPage.jsx
    │   │   ├── userAction.js
    │   │   ├── userSlice.js           # User Redux slice
    │   │   └── ...
    │   ├── App.jsx                    # Routes definition
    │   ├── store.js                   # Redux store
    │   └── main.jsx
    └── package.json
```

---

## ✨ Features

### 🧑‍💼 Employee

- Login with admin-created credentials
- View & respond to assigned tickets
- Access CRM dashboard

### 🔐 Admin

- Secure admin login (separate flow)
- View all tickets with filter & search
- Reply to, close, or delete tickets
- **Create employee accounts** with email/password
- **Block/Unblock** employee access
- View all employees list

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Redis (local or cloud)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CustomerRelationManagement.git
cd CustomerRelationManagement
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file (see [Environment Variables](#environment-variables))

```bash
npm run dev
# Server running on port 4000
```

### 3. Frontend Setup

```bash
cd Frontend/CRMfrontend
npm install
npm run dev
# Vite running on http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `Backend/` directory:

```env
PORT=4000
DATABASE=mongodb://localhost:27017/crm
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_REFRESH_SECRET_EXP_DAY=30
REDIS_URL=redis://localhost:6379
```

| Variable             | Description                                        |
| -------------------- | -------------------------------------------------- |
| `PORT`               | Backend server port                                |
| `DATABASE`           | MongoDB connection URI                             |
| `JWT_ACCESS_SECRET`  | Secret for signing access tokens (15min expiry)    |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens (30 days expiry) |
| `REDIS_URL`          | Redis connection URL for session storage           |

---

## 📡 API Reference

### Auth — User

| Method | Endpoint                  | Description                | Auth |
| ------ | ------------------------- | -------------------------- | ---- |
| POST   | `/v1/user/register`       | Register new user          | ❌   |
| POST   | `/v1/user/login`          | User login                 | ❌   |
| GET    | `/v1/user`                | Get user profile           | ✅   |
| DELETE | `/v1/user/logout`         | User logout                | ✅   |
| POST   | `/v1/user/reset-password` | Request password reset PIN | ❌   |
| PATCH  | `/v1/user/reset-password` | Update password with PIN   | ❌   |

### Auth — Admin

| Method | Endpoint           | Description       | Auth     |
| ------ | ------------------ | ----------------- | -------- |
| POST   | `/v1/admin/login`  | Admin login       | ❌       |
| GET    | `/v1/admin`        | Get admin profile | ✅ Admin |
| POST   | `/v1/admin`        | Create new admin  | ❌       |
| DELETE | `/v1/admin/logout` | Admin logout      | ✅ Admin |

### Employee Management (Admin only)

| Method | Endpoint                     | Description             | Auth     |
| ------ | ---------------------------- | ----------------------- | -------- |
| POST   | `/v1/new-user/create-user`   | Create employee account | ✅ Admin |
| GET    | `/v1/new-user/users`         | Get all employees       | ✅ Admin |
| PUT    | `/v1/new-user/toggle-status` | Block/Unblock employee  | ✅ Admin |

### Tickets

| Method | Endpoint               | Description        | Auth     |
| ------ | ---------------------- | ------------------ | -------- |
| POST   | `/v1/ticket`           | Create new ticket  | ✅ User  |
| GET    | `/v1/ticket`           | Get user's tickets | ✅ User  |
| GET    | `/v1/ticket/all`       | Get all tickets    | ✅ Admin |
| GET    | `/v1/ticket/:id`       | Get single ticket  | ✅       |
| POST   | `/v1/ticket/reply/:id` | Reply to ticket    | ✅       |
| PATCH  | `/v1/ticket/close/:id` | Close ticket       | ✅ Admin |
| DELETE | `/v1/ticket/:id`       | Delete ticket      | ✅ Admin |

### Tokens

| Method | Endpoint                    | Description          | Auth           |
| ------ | --------------------------- | -------------------- | -------------- |
| GET    | `/v1/tokens/new-access-jwt` | Refresh access token | ✅ Refresh JWT |

---

## 🔑 Role-Based Access

| Feature Employee        | Admin |
| ----------------------- | ----- |
| Submit tickets ❌       | ❌    |
| View own tickets ✅     | ✅    |
| Reply to tickets ✅     | ✅    |
| View all tickets ❌     | ✅    |
| Close/Delete tickets ❌ | ✅    |
| Create employees ❌     | ✅    |
| Block/Unblock users ❌  | ✅    |
| Admin dashboard ❌      | ✅    |

---

## 🔒 Authentication Flow

```
employee Login
    │
    ▼
POST /v1/user/login
    │
    ├── Verify email + password (bcrypt)
    ├── Check role match
    │
    ▼
Generate Tokens
    ├── accessJWT  → stored in Redis (60 min)
    └── refreshJWT → stored in MongoDB + Redis (60 days)
    │
    ▼
Frontend Storage
    ├── accessJWT  → sessionStorage + localStorage
    └── refreshJWT → localStorage (crmSite key)
    │
    ▼
Protected Routes
    ├── Authorization header: Bearer <accessJWT>
    ├── Middleware verifies JWT → checks Redis
    └── If expired → use refreshJWT → new accessJWT
```

---

## 🧑‍💻 Author

Built with ❤️ as a full-stack MERN project.

---

## 📄 License

This project is for educational/personal use.

## 📄 For check employee login and logout you can use these email or password

## email : pushpraj@gmail.com

## password : pushpraj

## email : kaushal@gmail.com

## password : kaushal

## Admin

## email : admin@gmail.com

## password : admin
