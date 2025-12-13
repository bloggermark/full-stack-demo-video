# Full-Stack Developer Journal

A comprehensive full-stack web application demonstrating modern development practices including user authentication, CRUD operations, email integration, and secure API design.

## 🎯 Purpose

This project is built for educational purposes to showcase:

- React frontend with Vite and TailwindCSS
- Node.js/Express backend with security middleware
- User authentication with Clerk
- Email functionality via SendGrid
- CRUD operations with lowdb storage
- CSRF protection and CORS configuration
- Production deployment patterns

## 🛠 Tech Stack

**Frontend:**

- React + Vite
- TailwindCSS
- Clerk Authentication
- React Router

**Backend:**

- Node.js + Express
- Handlebars templating
- lowdb (JSON database)
- SendGrid email API
- Security: CORS, CSRF, cookie-parser

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Clerk account (for authentication)
- SendGrid account (for email features)

### 1. Clone Repository

```bash
git clone <repository-url>
cd fullstack-starter
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

Create `.env` files with your private keys:

**Backend (.env in `/backend` folder):**

```env
PORT=3000
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=your_verified_sender@example.com
```

**Frontend (.env in `/frontend` folder):**

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Launch Application

**Start Backend (Terminal 1):**

```bash
cd backend
npm run dev
```

**Start Frontend (Terminal 2):**

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 🔑 Required API Keys

### Clerk Authentication

1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the publishable key to frontend `.env`

### SendGrid Email

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Verify a sender email address
4. Add both to backend `.env`

## 📁 Project Structure

```
fullstack-starter/
├── backend/
│   ├── lib/
│   │   ├── server.js
│   │   ├── route-handlers.js
│   │   └── persistent-database.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🔒 Security Features

- CSRF token protection
- CORS configuration
- Cookie-based sessions
- Environment variable management
- Input validation and sanitization

## 📚 Learning Objectives

This project demonstrates:

- Modern React development patterns
- Express.js API design
- Authentication integration
- Database operations
- Email service integration
- Security best practices
- Environment configuration

## ⚠️ Important Notes

- **Never commit `.env` files** - they contain sensitive information
- Create your own API keys and credentials
- The project uses development settings - review security for production
- Sample data is included for demonstration purposes

## 🤝 Contributing

This is an educational project. Feel free to fork, experiment, and learn!
