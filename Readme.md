

You must have the following installed:

- Node.js (v18 or higher recommended)
- MySQL (MySQL Workbench or MySQL Server)
- Git
- A code editor (VS Code recommended)


=====================================
DATABASE SETUP (REQUIRED)
=====================================

1) Open MySQL Workbench
2) Create a database:

   CREATE DATABASE moderntech_hr;

3) Import the SQL dump file provided in:
   Backend/database/moderntech_hr.sql

This will automatically create all required tables and sample data.


=====================================
ENVIRONMENT VARIABLES (IMPORTANT)
=====================================

Each user must create their own .env file.

Location:
Backend/.env

Contents:

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=moderntech_hr
PORT=3000

NOTE:
- The .env file is NOT pushed to GitHub
- Each team member uses their own MySQL credentials


=====================================
BACKEND – HOW TO RUN
=====================================

1) Open terminal
2) Navigate to backend folder:

   cd Backend

3) Install dependencies:

   npm install

4) Start the backend server:

   node index.js

If successful, you should see:
- Server running on http://localhost:3000
- DB connection OK


=====================================
FRONTEND – HOW TO RUN
=====================================

1) Open a NEW terminal
2) Navigate to frontend folder:

   cd Frontend

3) Install dependencies:

   npm install

4) Start frontend server:

   npm run dev

5) Open browser at:

   http://localhost:5173


=====================================
LOGIN DETAILS
=====================================

Use the following credentials to log in:

Username: admin
Password: admin123


=====================================
APPLICATION FEATURES
=====================================

- Login authentication
- Dashboard navigation
- View all employees
- View single employee details
- Add new employees
- Attendance records
- Payroll data
- Leave requests
- REST API using Express
- MySQL database integration


=====================================
IMPORTANT NOTES FOR MARKING
=====================================

- Backend and frontend must both be running
- MySQL database must be imported before running backend
- Each user configures their own .env file
- Node modules are installed using npm install


=====================================
HOW TO RUN (QUICK SUMMARY)
=====================================

Backend:
cd Backend
npm install
node index.js

Frontend:
cd Frontend
npm install
npm run dev
