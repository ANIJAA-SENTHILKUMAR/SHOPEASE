# 🛍️ ShopEase — Full Stack Ecommerce App

A full stack ecommerce app built with **React**, **Express.js** and **MongoDB**.

---

## ⚙️ Prerequisites — Install these first

| Tool | Download Link |
|------|--------------|
| Node.js (v18+) | https://nodejs.org |
| MongoDB Community | https://www.mongodb.com/try/download/community |
| Git (optional) | https://git-scm.com |

### MongoDB Installation Note
- During MongoDB install, check ✅ **"Install MongoD as a Service"**
- This makes MongoDB start automatically with Windows

---

## 🚀 Setup & Run (Step by Step)

### Step 1 — Get the project
Either unzip the folder OR clone from GitHub:
```
git clone <repo-url>
cd ecommerce-app
```

### Step 2 — Install Frontend dependencies
```cmd
cd ecommerce-app
npm install
```

### Step 3 — Install Backend dependencies
```cmd
cd ecommerce-app\backend
npm install
```

### Step 4 — Seed the database (only once)
```cmd
cd ecommerce-app\backend
npm run seed
```
You should see:
```
✅ MongoDB Connected: localhost
✅ 12 products seeded
✅ Users seeded  (admin@shopease.com / admin123)
```

### Step 5 — Start Backend (Terminal 1)
```cmd
cd ecommerce-app\backend
node server.js
```
You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on http://localhost:5000
```

### Step 6 — Start Frontend (Terminal 2)
```cmd
cd ecommerce-app
npm start
```
Browser opens at **http://localhost:3000** ✅

---

## 🔑 Test Credentials

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@shopease.com | admin123 |
| User  | john@example.com | user123 |

---

## 📁 Project Structure

```
ecommerce-app/
├── src/                  → React Frontend
│   ├── pages/            → Home, Products, Cart, Auth, Orders
│   ├── components/       → Navbar, ProductCard
│   ├── context/          → CartContext, AuthContext
│   └── services/api.js   → API calls to backend
├── backend/
│   ├── models/           → User, Product, Order (MongoDB schemas)
│   ├── routes/           → auth, products, orders
│   ├── middleware/        → JWT auth guard
│   ├── config/db.js      → MongoDB connection
│   ├── server.js         → Express entry point
│   └── seed.js           → Database seeder
└── package.json
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET  | /api/products | Get all products |
| POST | /api/orders | Place an order |
| GET  | /api/orders/my | Get my orders |

---

## ❗ Troubleshooting

**"Failed to load products"**
→ Make sure backend is running on port 5000 first

**MongoDB not connecting**
→ Open Services (Win+R → services.msc) → find MongoDB → click Start

**Port already in use**
→ Run: `netstat -ano | findstr :5000` then `taskkill /F /PID <pid>`
