import { Router } from "express";
import pool from "../DB_config.js";
import { verifyToken } from "../jwt-middleware.js";

const router = Router();
router.use(verifyToken);
// CREATE
router.post("/clients", async (req, res) => {
  try {
    const { id, name, address, phoneNumber, email, lastNames, bornDate } =
      req.body;
    console.log(name, address, phoneNumber, email, lastNames, bornDate);
    const result = await pool.query(
      "SELECT * FROM insert_persona($1, $2, $3, $4, $5, $6, $7)",
      [id, name, lastNames, bornDate, address, phoneNumber, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (All)
router.get("/clients", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_personas()");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/clients/exists/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await pool.query("SELECT * FROM get_persona_by_id($1)", [
      id,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking person existence:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ (One)
router.get("/clients/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_persona_by_id($1)", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/clients/:id", async (req, res) => {
  try {
    const { name, address, phoneNumber, email, lastNames, bornDate } = req.body;
    console.log(name, address, phoneNumber, email, lastNames, bornDate);
    const result = await pool.query(
      "SELECT * FROM update_persona($1, $2, $3, $4, $5, $6, $7)",
      [req.params.id, name, lastNames, bornDate, address, phoneNumber, email]
    );
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await pool.query("SELECT delete_persona($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
