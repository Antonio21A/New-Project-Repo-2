import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// GET all employees
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee_information');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee_information WHERE employee_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
