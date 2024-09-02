import {Router} from "express";
import pool from "../DB_config.js";
import {v4} from "uuid";

const router = Router();

// CREATE
router.post("/entities", async (req, res) => {
  try {
    const {name, address, phone, directorName, email, type} = req.body;
    console.log(name, address, phone, directorName, email, type);
    const result = await pool.query(
      "SELECT * FROM insert_entidad($1, $2, $3, $4, $5, $6, $7)",
      [v4(), name, type, address, phone, email, directorName]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// READ (All)
router.get("/entities", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_entidades()");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

router.get("/entities/exists/:id/", async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const result = await pool.query("SELECT * FROM get_entidad_by_id($1)", [
      id,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({exists: true});
    } else {
      res.status(404).json({exists: false});
    }
  } catch (err) {
    console.error("Error checking entity existence:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

// READ (One)
router.get("/entities/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_entidad_by_id($1)", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({error: "Entity not found"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// UPDATE
router.put("/entities/:id", async (req, res) => {
  try {
    const {name, address, phone, directorName, email, type} = req.body;
    console.log(name, address, phone, directorName, email, type);
    const result = await pool.query(
      "SELECT * FROM update_entidad($1, $2, $3, $4, $5, $6, $7)",
      [req.params.id, name, type, address, phone, email, directorName]
    );
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// DELETE
router.delete("/entities/:id", async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({error: "ID is required"});
    }

    const result = await pool.query("SELECT delete_entidad($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Entity not found"});
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error deleting entity:", err);
    res.status(400).json({error: err.message});
  }
});

export default router;
