import { Router } from "express";
import pool from "../DB_config.js";
import { verifyToken } from "../jwt-middleware.js";

const router = Router();
router.use(verifyToken);
// CREATE
router.post("/workers", async (req, res) => {
  try {
    const { id, name, email, lastNames, password, role } = req.body;
    console.log(name, email, lastNames, password, role);
    const result = await pool.query(
      "SELECT * FROM insert_trabajador($1, $2, $3, $4, $5, $6)",
      [id, name, lastNames, email, password, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (All)
router.get("/workers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_trabajadores()");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (One)
router.get("/workers/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_trabajador_by_id($1)", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Worker not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/workers/:id", async (req, res) => {
  try {
    const { id, name, lastNames, email, password, role } = req.body;
    console.log(id, name, lastNames, email, password, role);
    const result = await pool.query(
      "SELECT * FROM update_trabajador($1, $2, $3, $4, $5, $6)",
      [req.params.id, name, lastNames, email, password, role]
    );
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/workers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await pool.query("SELECT delete_trabajador($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Worker not found" });
    }
    console.log(result);
    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error deleting worker:", err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/workers/exists/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await pool.query("SELECT * FROM get_trabajador_by_id($1)", [
      id,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking worker existence:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
