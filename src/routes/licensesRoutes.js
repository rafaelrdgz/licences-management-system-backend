import { Router } from "express";
import pool from "../DB_config.js";
import { customAlphabet } from "nanoid";
import { verifyToken } from "../jwt-middleware.js";

const router = Router();
router.use(verifyToken);
// CREATE
router.post("/licenses", async (req, res) => {
  try {
    const { driverId, category, restrictions } = req.body;
    const issueDate = new Date();
    const expirationDate = new Date(
      issueDate.getFullYear() + 20,
      issueDate.getMonth(), // Mes debe ser el mismo
      issueDate.getDate() // Usar getDate() para el día del mes
    );

    const nanoid = customAlphabet("0123456789", 6);

    console.log(driverId, category, restrictions, issueDate, expirationDate);
    const result = await pool.query(
      "SELECT * FROM insert_licencia($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        nanoid(),
        driverId,
        issueDate,
        expirationDate,
        restrictions,
        false,
        0,
        category,
      ]
    );
    res.status(201).json(result.rows[0]);
    console.log(expirationDate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/licenses/exists/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await pool.query("SELECT * FROM get_licencia_by_id($1)", [
      id,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking license existence:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// READ (All)
router.get("/licenses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_licencias()");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (One)
router.get("/licenses/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_licencia_by_id($1)", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "License not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/licenses/:id/categories", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM get_missing_categories($1)",
      [req.params.id]
    );
    res.status(200).json(result.rows[0].get_missing_categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/licenses/:id", async (req, res) => {
  try {
    const { expirationDate, restrictions, renewed, points } = req.body;

    console.log(expirationDate, restrictions, renewed, points);

    const result = await pool.query(
      "SELECT * FROM update_licencia($1, $2, $3, $4, $5)",
      [req.params.id, expirationDate, restrictions, renewed, points]
    );
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/licenses/:id/add_category", async (req, res) => {
  try {
    const { expirationDate, restrictions, renewed, points, category } =
      req.body;

    console.log(expirationDate, restrictions, renewed, points, category);

    const result = await pool.query(
      "SELECT * FROM update_licencia($1, $2, $3, $4, $5, $6)",
      [req.params.id, expirationDate, restrictions, renewed, points, category]
    );
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete("/licenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const result = await pool.query("SELECT delete_licencia($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "License not found" });
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error deleting license:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
