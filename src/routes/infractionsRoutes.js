import {Router} from "express";
import pool from "../DB_config.js";
import {v4} from "uuid";

const router = Router();

// CREATE
router.post("/infractions", async (req, res) => {
  try {
    const {licenseid, type, address, description, pointsDeducted, paid} = req.body;
    console.log(licenseid, type, address, description, pointsDeducted, paid);
    const date = new Date()
    const result = await pool.query(
      "SELECT * FROM insert_infraccion($1, $2, $3, $4, $5, $6, $7, $8)",
      [v4(), licenseid, type, date, address, description, pointsDeducted, paid]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// READ (All)
router.get("/infractions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_infracciones()");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// READ (One)
router.get("/infractions/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_infraccion_by_id($1)", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({error: "Infraction not found"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// UPDATE
router.put("/infractions/:id", async (req, res) => {
  try {
    const {licenseid, type, date, address, description, pointsDeducted, paid} = req.body;
    console.log(licenseid, type, date, address, description, pointsDeducted, paid);
    const result = await pool.query(
      "SELECT * FROM update_infraccion($1, $2, $3, $4, $5, $6, $7, $8)",
      [req.params.id, licenseid, type, date, address, description, pointsDeducted, paid]
    );
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// DELETE
router.delete("/infractions/:id", async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({error: "ID is required"});
    }

    const result = await pool.query("SELECT delete_infraccion($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Infraction not found"});
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error deleting infraction:", err);
    res.status(400).json({error: err.message});
  }
});

export default router;
