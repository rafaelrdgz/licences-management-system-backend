import { Router } from "express";
import pool from "../DB_config.js";
import { verifyToken } from "../jwt-middleware.js";

const router = Router();
router.use(verifyToken);

router.get('/dashboard/licenses/by_type', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_licenses_by_type()');
    res.json(result.rows[0].get_licenses_by_type);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/clients', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_total_clients()');
    res.json(result.rows[0].get_total_clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/drivers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_total_drivers()');
    res.json(result.rows[0].get_total_drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/licenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_total_licenses()');
    res.json(result.rows[0].get_total_licenses)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/exams', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_total_exams()');
    res.json(result.rows[0].get_total_exams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/exams/passed_practical', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_passed_practical()');
    res.json(result.rows[0].get_passed_practical);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/licenses/about_to_expire', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_licencias_por_vencer()');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/exams/medical', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_conductores_sin_examenes()');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/dashboard/infractions/no_paid', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM get_no_paid_infractions()');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router