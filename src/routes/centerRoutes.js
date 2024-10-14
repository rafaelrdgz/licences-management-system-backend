import { Router } from "express";
import pool from "../DB_config.js";
import multer from "multer";

import { verifyToken } from "../jwt-middleware.js";

const router = Router();

const storage = multer.memoryStorage(); // Almacenar en memoria para que se procese fácilmente como Buffer
const upload = multer({ storage });
router.use(verifyToken);

router.get("/center", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_centro_by_id()");
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Client not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/center', async (req, res) => {
  const {
    code, name, address, phone, directorName, humanResourcesName, accountantName, syndicateSecretaryName
  } = req.body;
  const { logo: newLogoPath, oldLogoPath } = req.body;

  // Procesa la actualización del centro en la BD con los nuevos datos.
  try {
    const query = `SELECT update_centro($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    const values = [code, name, address, phone, directorName, humanResourcesName, accountantName, syndicateSecretaryName, newLogoPath];
    const response = await pool.query(query, values);
    res.json({ message: 'Centro actualizado exitosamente', response:response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error actualizando el centro' });
  }
});

export default router;
