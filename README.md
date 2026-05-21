# TaskFlow

TaskFlow is a full-stack task management application built with React, Vite, Node.js, Express, and MongoDB. It provides user authentication, email verification, task creation and organization, completed task tracking, and productivity insights.

## Key Features

- User signup and login with session-based authentication
- Email verification for new accounts
- Task creation, editing, and deletion
- Task categories such as Today, Upcoming, and Completed
- Analytics and charts for task progress
- Theme support with light/dark mode
- Responsive UI with modern animations

## Project Structure

- `Backend/`
  - `app.js` — Express server entry point
  - `config/db.js` — MongoDB connection logic
  - `router/` — API routes for auth and tasks
  - `models/` — Mongoose schemas for users, tasks, and verification tokens
  - `controller/` — Business logic for auth, tasks, and email verification
  - `utils/mailer.js` — Email delivery helper

- `Frontend/`
  - `src/` — React application source code
  - `src/pages/` — Route pages for login, signup, dashboard, tasks, and verification
  - `src/components/` — Reusable UI components and task-related widgets
  - `src/context/` — React context providers for theme and task state
  - `src/services/api.js` — Frontend API client for backend requests

## Technologies Used

- Frontend: React, Vite, React Router, Tailwind CSS, Framer Motion, Recharts, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, bcrypt, express-session, connect-mongo
- Other: Nodemailer, dotenv, CORS

## Setup and Run

### 1. Backend

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend/` with the following values:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```
4. Start the backend server:
   ```bash
   node app.js
   ```

### 2. Frontend

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit the app in the browser at the address shown by Vite, usually `http://localhost:5173`

## Environment Variables

Backend requires the following environment variables in `Backend/.env`:

- `MONGO_URI` — MongoDB connection string
- `SESSION_SECRET` — Secret for express-session
- `EMAIL_USER` — Email address used for sending verification emails
- `EMAIL_PASS` — Password or app-specific password for the email account

## API Endpoints

- `POST /signup` — Register a new user
- `POST /login` — Authenticate user
- `GET /verify-email/:token` — Verify a user email address
- `GET /tasks` — Fetch tasks for authenticated user
- `POST /tasks` — Create a new task
- `PUT /tasks/:id` — Update a user task
- `DELETE /tasks/:id` — Delete a task

## Notes

- The backend uses session cookies, so the frontend should use credentials when calling the API.
- If email verification is not sending, verify SMTP credentials and provider settings.
- Add tests and CI tooling to improve stability.

## Recommended Improvements

- Add unit and integration tests for backend and frontend
- Improve production deployment with build scripts and process manager
- Add form validation and error handling on both client and server
- Secure cookies with `secure: true` in production environments

## License

This project is available under the MIT License.
