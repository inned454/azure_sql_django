# Azure SQL Django Frontend

This is the React frontend application for the Azure SQL Django API project. It provides a premium, responsive admin interface for managing Stores, Products, Users, Orders, and Reviews.

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Runtime:** Node.js 24 LTS (Required)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)

## ✨ Features

- **Store Management:** CRUD operations for physical store locations.
- **Product Catalog:** Manage products with a premium grid view.
- **Order System:** Create orders via a multi-step wizard and track status.
- **User Management:** View and search platform users.
- **Reviews:** Integrated MongoDB-backed review system for products.
- **Premium UI:** Dark mode optimized, glassmorphism effects, and smooth transitions.

## 🛠️ Prerequisites

- **Node.js:** version 24.0.0 or higher.
- **Backend:** The Django API must be running on `http://localhost:8000`.

## ⚙️ Configuration

- [API URL Setup](docs/API_SETUP.md) - Instructions for switching between local and production API environments.

## 📦 Installation

1. Clone the repository (if you haven't already).
2. Install dependencies:

```bash
npm install
```

## ▶️ Running the Application

### Development
Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will be available at usually `http://localhost:5173`.

### Production Build
Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```text
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
│   └── ui/          # Generic UI elements (Button, Card, Modal, Input)
├── pages/           # Page components (Dashboard, Stores, Products, etc.)
├── services/        # API service modules
├── App.jsx          # Main application component & routing
├── index.css        # Global styles & Tailwind configuration
└── main.jsx         # Entry point
```

## 🎨 Design System

The project uses a custom Tailwind configuration defined in `src/index.css` using modern CSS variables:

- **Primary Color:** Sky Blue (`#38bdf8`)
- **Secondary Color:** Indigo (`#818cf8`)
- **Accent Color:** Pink (`#f472b6`)
- **Background:** Slate 900 (`#0f172a`)
