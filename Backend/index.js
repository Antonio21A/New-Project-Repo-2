import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';            // <-- add this
import { pool } from './db.js';

// Import route files
import employeeRoutes from './routes/employee.js';
import attendanceRoutes from './routes/attendance.js';
import payrollRoutes from './routes/payroll.js';
import leaveRoutes from './routes/leave.js';
import authRoutes from './routes/auth.js';  // <-- new

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // <-- allow frontend
app.use(express.json());

// Friendly root route
app.get('/', (req, res) => {
  res.send('Backend is running! Use /api/employees, /api/attendance, /api/payroll, /api/leave');
});

// Test DB connection on startup
pool.query('SELECT 1 + 1 AS result')
  .then(([rows]) => console.log('DB connection OK:', rows))
  .catch(err => console.error('DB connection FAILED:', err));

// API routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/auth', authRoutes);  // <-- add this

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
