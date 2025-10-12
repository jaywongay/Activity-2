# Activity-2
Personal notes app with login, register, and note management. ReactJS + NestJS + MySQL.

## Features

- User Authentication (Login & Register)
- Password Reset via Email
- Create, Read, Update, Delete Notes
- Private notes for each user
- Modern responsive UI
- MySQL database

# Notes App - Tech Stack

## Frontend
- **ReactJS** - UI library
- **CSS** - Styling

## Backend
- **Node.js** - JavaScript runtime
- **NestJS** - Backend framework
- **TypeScript** - Programming language

## Database
- **MySQL** - Relational database
- **XAMPP** - Local development environment
- **TypeORM** - Object-Relational Mapping (ORM)
- **mysql2** - MySQL driver

## Authentication & Security
- **JWT (JSON Web Tokens)** - Token-based authentication
- **bcryptjs** - Password hashing
- **nodemailer** - Email service (password reset)

## API Documentation
- **Swagger** - API documentation with NestJS

## Development Tools
- **npm** - Package manager
- **Git/GitHub** - Version control

## Architecture
- **REST API** - API design pattern
- **MVC Pattern** - Model-View-Controller architecture

## Key Libraries & Dependencies
- **express** - HTTP server framework (in NestJS)
- **class-validator** - Input validation
- **class-transformer** - Data transformation
- **@nestjs/swagger** - Swagger integration
- **@nestjs/jwt** - JWT authentication
- **@nestjs/passport** - Passport authentication strategy
- **passport-jwt** - JWT strategy for Passport
- **bcrypt** - Password hashing
- **nodemailer** - Email sending
- **mysql2** - MySQL database driver
- **@nestjs/config** - Configuration management

---

## Summary

**Total Technologies Used:** 20+

- 2 Frontend technologies
- 3 Backend core technologies
- 4 Database technologies (MySQL, XAMPP, TypeORM, mysql2)
- 5 Authentication & Security solutions
- 1 API documentation tool
- 5+ Development & support tools

## Prerequisites

Make sure you have installed:
- Node.js (v14 or higher)
- npm
- XAMPP (with Apache and MySQL)

## Project Structure

Activity2/
├── backend/              (NestJS API)
├── frontend/             (React UI)
├── database/
│   └── schema.sql        (Database structure)
└── README.md

## Setup Instructions

### 1. Database Setup

1. Open XAMPP Control Panel and start Apache and MySQL
2. Go to http://localhost/phpmyadmin
3. Create new database:
   - Click "New" on the left sidebar
   - Database name: `notes_app`
   - Click "Create"
4. Import the database schema:
   - Select the `notes_app` database
   - Go to "Import" tab
   - Click "Choose File" and select `database/schema.sql`
   - Click "Go"

### 2. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the backend root directory:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=notes_app
   JWT_SECRET=your_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```
   
   The backend will run on `http://localhost:3001`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the frontend root directory:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

4. Start the frontend application:
   ```bash
   npm start
   ```
   
   The app will open on `http://localhost:3000`

## Running the Application

Make sure both backend and frontend are running:

1. Terminal 1 (Backend):
   ```bash
   cd backend
   npm run start:dev
   ```

2. Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and go to `http://localhost:3000`

## API Endpoints

All API endpoints are documented in Swagger at:
```
http://localhost:3001/api/docs
```

### Main Endpoints:
- `POST /auth/register` - Create new account
- `POST /auth/login` - Login to account
- `POST /auth/forgot-password` - Request password reset
- `GET /notes` - Get all user notes
- `POST /notes` - Create new note
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

## Features Overview

### Authentication
- Register with email and password
- Login with credentials
- Password reset via email
- JWT token-based authentication

### Notes Management
- Create new notes with title and content
- View all personal notes
- Edit notes
- Delete notes
- Each user can only see their own notes

## Troubleshooting

Backend not connecting to database?
- Check if MySQL is running in XAMPP
- Verify `.env` database credentials are correct
- Make sure database `notes_app` exists

Frontend can't connect to backend?
- Check if backend is running on port 3001
- Verify `REACT_APP_API_URL` in `.env`
- Check browser console for errors

Port already in use?
- Backend default: 3001
- Frontend default: 3000
- Change ports if conflicts occur

## Author

Activity 2 - Notes App

## License

All rights reserved
