import {Router} from "express";
import pool from "../DB_config.js";

const router = Router();

// READ (All)
router.get("/drivers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_conductores()");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

router.get("/drivers/exists/:id/", async (req, res) => {
  try {
    const {id} = req.params;
    console.log(id);
    const result = await pool.query("SELECT * FROM get_conductor_by_id($1)", [
      id,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({exists: true});
    } else {
      res.status(404).json({exists: false});
    }
  } catch (err) {
    console.error("Error checking driver existence:", err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

// READ (One)
router.get("/drivers/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_conductor_by_id($1)", [
      req.params.id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({error: "Driver not found"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// UPDATE
router.put("/drivers/:id", async (req, res) => {
  try {
    const {
      name,
      address,
      phoneNumber,
      email,
      lastNames,
      bornDate,
      licenseStatus,
    } = req.body;
    console.log(
      name,
      address,
      phoneNumber,
      email,
      lastNames,
      bornDate,
      licenseStatus
    );
    const result = await pool.query(
      "SELECT * FROM update_conductor($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        req.params.id,
        name,
        lastNames,
        bornDate,
        address,
        phoneNumber,
        email,
        licenseStatus,
      ]
    );
    console.log(result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// DELETE
router.delete("/drivers/:id", async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({error: "ID is required"});
    }

    const result = await pool.query("SELECT delete_conductor($1)", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Driver not found"});
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error deleting driver:", err);
    res.status(400).json({error: err.message});
  }
});

export default router;
