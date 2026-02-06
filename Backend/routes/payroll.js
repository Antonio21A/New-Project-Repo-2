import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all payroll
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payroll');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET payroll for single employee
router.get('/:employeeId', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM payroll WHERE employee_id = ?', [req.params.employeeId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
