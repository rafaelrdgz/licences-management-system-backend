import { Router } from "express";
import pool from "../DB_config.js";

const router = Router();

router.get("/driver_report/:driverId", async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const result = await pool.query("SELECT * FROM get_conductor_details($1)", [
      driverId,
    ]);
      res.status(200).json(result.rows[0].get_conductor_details);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/licenses_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query("SELECT * FROM get_licenses_by_date_range($1, $2)", [
      startDate,
      endDate,
    ]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/exams_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query("SELECT * FROM get_exams_by_date_range($1, $2)", [
      startDate,
      endDate,
    ]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/infractions_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query("SELECT * FROM get_infractions_by_date_range($1, $2)", [
      startDate,
      endDate,
    ]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/expired_licenses_report", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const result = await pool.query("SELECT * FROM get_expired_licenses_by_date_range($1, $2)", [
      startDate,
      endDate,
    ]);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/infractions_report/by_type/:year', async (req, res) => {
  const { year } = req.params;
  console.log(year)
  try {
    const result = await pool.query('SELECT * FROM get_infractions_by_type($1)', [year]);
    res.json(result.rows[0].get_infractions_by_type);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/infractions_report/by_year/:year', async (req, res) => {
  const { year } = req.params;
  console.log(year)
  try {
    const result = await pool.query('SELECT * FROM get_infractions_by_year($1)', [year]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
