# 🩸 Blood Donation Application (B12-A11_category-01)

## 📌 Project Overview

The **Blood Donation Application** is a full-stack MERN-based web platform designed to connect blood donors with people in need. The system ensures a smooth blood donation workflow with role-based dashboards, secure authentication, donation request management, and a modern, responsive UI.

This project was developed to demonstrate real-world application development skills, including frontend design, backend API development, authentication, authorization, and deployment.

---

## 🎯 Purpose
* Connect blood donors with recipients efficiently
* Manage blood donation requests securely
* Provide role-based access (Admin, Donor, Volunteer)
* Ensure scalability, security, and usability

---

## 🌐 Live Links
* **Frontend Live Site:** https://blood-bridge-web12-assignmen-11.netlify.app
* **Backend API:** https://blood-bridge-server-sigma.vercel.app

---

## 👥 User Roles & Permissions

### 🩸 Donor
* Register & login
* Create blood donation requests
* View, edit, delete own requests
* Update donation status (pending → inprogress → done)
* View and Edit own profile

### 🤝 Volunteer
* Includes all permission of Donor
* View all blood donation requests
* Filter requests by status
* Update donation status only

### 🌐 Admin
* Full system access
* Manage users (block/unblock)
* Change user roles (donor → volunteer/admin)
* View & manage all donation requests
* View funding statistics

---

## 🔐 Authentication & Security
* Email & password authentication (Firebase)
* Role-based protected routes
* JWT-secured APIs
* Environment variables for sensitive credentials
* Reload-safe private routing

---

## 🧩 Core Features
### ✅ Public Pages
* Home Page (Banner, Featured Section, Contact)
* Registration & Login
* Search Donors (Blood Group, District, Upazila)
* Pending Blood Donation Requests

### 🔒 Private Dashboard
* Responsive Sidebar Layout
* Profile Management (Editable Form)
* Donor Dashboard (Recent Requests, My Requests)
* Admin Dashboard (Statistics, Users, Requests)
* Volunteer Dashboard (Request Management)

### 🆕 Donation Request System
* Create donation request
* Donation request details page
* Donate confirmation modal
* Status flow: pending → inprogress → done/canceled

### 💰 Funding (Challenge Feature)
* Stripe payment integration
* Funding history table
* Total funds shown on Admin & Volunteer dashboard

---

## 🖥️ Tech Stack
### Frontend
* React (Vite)
* React Router
* Tailwind CSS
* React Hook Form
* Axios
* Firebase Authentication
* React Icons
* React Hot Toast

### Backend
* Node.js
* Express.js
* MongoDB
* JWT
* CORS

---

## 📦 NPM Packages Used

### Client Side
* react
* react-router
* react-hook-form
* axios
* firebase
* react-hot-toast
* react-icons

### Server Side
* express
* mongodb
* cors
* dotenv

---


## 🚀 Deployment

### Frontend
* Deployed on **Netlify**

### Backend
* Deployed on **Vercel**

---

## 📊 Additional Features
* Pagination on tables
* Filtering by donation status
* Responsive design (Mobile, Tablet, Desktop)
* Consistent UI theme & spacing
* Secure reload-safe private routes

---

## 📁 Resources Used
* Bangladesh District & Upazila Data
* UI Inspiration from uiverse.io & ThemeForest

---

**Thank you for reviewing this project!** 🙌