# CivicBridge – MERN Government Scheme Finder

A professional civic-tech platform for personalized government benefit discovery, explainable eligibility guidance, document readiness checklist, and scheme comparison.

## Tech Stack
- **Frontend**: React + Vite + Tailwind/CSS + React Router + Lucide React
- **Backend**: Node.js + Express + Mongoose + JWT + Bcrypt
- **Database**: MongoDB (Compass / Atlas)
- **Features**: 25 Central & State welfare schemes, 4 demo personas, instant profile matching, 1-click authentication, and document checklists.

---

## Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB local instance (running on `mongodb://127.0.0.1:27017`) or MongoDB Atlas

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
npm run seed      # Seeds 25 schemes & demo users into MongoDB
npm run dev       # Starts server on http://localhost:5000
```

### 3. Frontend Setup
Open another terminal:
```bash
cd client
npm install
cp .env.example .env
npm run dev       # Starts client on http://localhost:5173
```

---

## Demo Accounts (For Reviews & Demos)
You can use the **1-Click Quick Sign In** buttons on `/login` or sign in with:

| Persona | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Priya Sharma** | `priya.sharma@example.com` | `password123` | College Student · Chennai |
| **Arun Kumar** | `arun.kumar@example.com` | `password123` | MSME Business Owner · Coimbatore |
| **Lakshmi Narayanan** | `lakshmi.farmer@example.com` | `password123` | Agricultural Farmer · Madurai |
| **Meenakshi Sundaram** | `meenakshi.senior@example.com` | `password123` | Senior Citizen · Tiruchirappalli |

---

## Database (MongoDB Compass)
- **Database Name**: `civicbridge`
- **Collections**:
  - `schemes` (25 government schemes)
  - `users` (5 accounts with bcrypt hashes and roles)
  - `profiles` (5 comprehensive demographic profiles)

---

## Disclaimer
The included scheme records are informational guidance based on government welfare notifications. Final eligibility, sanction, and disbursement are determined by the respective government ministries and nodal departments.
