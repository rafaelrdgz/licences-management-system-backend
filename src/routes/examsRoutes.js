import {Router} from "express";
import pool from "../DB_config.js";
import {v4} from "uuid";

const router = Router();

// CREATE
router.post("/exams", async (req, res) => {
  try {
    const {type, result, entityCode, examinerName, personId} =
      req.body;
    console.log(type, result, entityCode, examinerName, personId);
    const r = await pool.query(
      "SELECT * FROM insert_examen($1, $2, $3, $4, $5, $6, $7)",
      [v4(), type, new Date(), result, entityCode, examinerName, personId]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// READ (All)
router.get("/exams", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_examenes()");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// READ (One)
router.get("/exams/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_examen_by_id($1)", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({error: "Exam not found"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// UPDATE
router.put("/exams/:id", async (req, res) => {
  try {
    const {type, date, result, entityCode, examinerName, personId} = req.body;
    console.log(type, date, result, entityCode, examinerName, personId);
    const r = await pool.query(
      "SELECT * FROM update_examen($1, $2, $3, $4, $5, $6, $7)",
      [req.params.id, type, date, result, entityCode, examinerName, personId]
    );
    console.log(r);
    res.status(200).json(r.rows[0]);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// DELETE
router.delete("/exams/:id", async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({error: "ID is required"});
    }

    const result = await pool.query("SELECT delete_examen($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Exam not found"});
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error deleting exam:", err);
    res.status(400).json({error: err.message});
  }
});

router.get("/exams/check/:id/", async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const result = await pool.query("SELECT * FROM examenes_aprobados($1, $2)", [
      id, new Date()
    ]);
    console.log(result.rows[0].examenes_aprobados)
    if (result.rows[0].examenes_aprobados === true) {
      res.status(200).json({exists: true});
    } else {
      res.status(404).json({exists: false});
    }
  } catch (err) {
    console.error("Error checking driver existence:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

export default router;
