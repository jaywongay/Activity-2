## Notes App (React + NestJS)
Personal notes application with login, registration, email-based password reset, and CRUD for notes. Uses SQLite.

### Tech Stack
- Frontend: React, React Router, CSS
- Backend: NestJS, TypeScript, TypeORM
- Database: SQLite
- Auth & Mail: JWT, bcrypt, Nodemailer (Gmail SMTP)

---

## Quick Start (SQLite – recommended for local dev)

1. Install prerequisites
   - Node.js 18+ and npm
   - Optional: DB Browser for SQLite (to inspect the DB file)

2. Backend – install and configure
   ```bash
   cd backend
   npm install
   ```
   Create a file named `.env` in `backend/` with:
   ```
   DB_TYPE=sqlite
   DB_DATABASE=database.sqlite
   JWT_SECRET=your_secret_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_google_app_password
   FRONTEND_URL=http://localhost:3000
   # Back-compat only (not used by TypeORM when SQLite)
   DB_NAME=notes_app
   ```
   Start the API:
   ```bash
   npm run start:dev
   ```
   - Runs at `http://localhost:3001`
   - First run creates `backend/database.sqlite`

3. Frontend – install and run
   Open a new terminal:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   - Opens `http://localhost:3000`

4. Test the app
   - Register, login, create notes
   - Use “Forgot Password” to test email (requires valid Gmail app password)

---

## Project Structure
```
activity_2/
├── backend/            # NestJS API (TypeORM, Auth, Mail)
└── frontend/           # React app
```

---

## Environment Variables (backend)
- DB_TYPE: `sqlite`
- DB_DATABASE: SQLite file name (e.g., `database.sqlite`)
- JWT_SECRET: secret key for signing JWTs
- EMAIL_USER, EMAIL_PASSWORD: Gmail credentials (use Google App Password)
- FRONTEND_URL: base URL for email links (e.g., password reset)

Frontend `.env` (optional):
```
REACT_APP_API_URL=http://localhost:3001
```

---

## Useful Commands
- Backend
  - `npm run start:dev` – start API in watch mode
  - `npm run build && npm run start:prod` – production build/run
- Frontend
  - `npm start` – start React dev server
  - `npm run build` – production build

---

## API Docs
Swagger is available at:
```
http://localhost:3001/api/docs
```

Main endpoints:
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/forgot-password`
- GET `/notes`
- POST `/notes`
- PATCH `/notes/:id`
- DELETE `/notes/:id`

---

## Viewing the Database (SQLite)
- File: `backend/database.sqlite`
- Open with DB Browser for SQLite or a VS Code SQLite extension
- CLI (if installed): `cd backend && sqlite3 database.sqlite`

---

## Troubleshooting
- React error “react-scripts not recognized”
  - Run `cd frontend && npm install` first, then `npm start`.
- Backend cannot connect to DB
  - SQLite: ensure `DB_TYPE=sqlite`, restart backend, and check the DB file exists.
- Email not sending
  - Use a Gmail App Password and allow SMTP; check `EMAIL_USER`/`EMAIL_PASSWORD`.
- Port conflicts
  - Frontend: 3000, Backend: 3001. Close competing processes or change ports.

