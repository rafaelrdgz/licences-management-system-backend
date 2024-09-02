import {response, Router} from "express";
import pool from "../DB_config.js";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage(); // Almacenar en memoria para que se procese fácilmente como Buffer
const upload = multer({ storage });

router.get("/center", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM get_centro_by_id('1')")
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({error: "Client not found"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

router.put('/center', upload.single('logo'), async (req, res) => {
  const {id} = "1";
  const {
    name, address, phone, directorName, humanResourcesName, accountantName, syndicateSecretaryName
  } = req.body;
  const logo = req.file ? req.file.buffer : null;

  try {
    const query = `SELECT update_centro($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    const values = [id, name, address, phone, directorName, humanResourcesName, accountantName, syndicateSecretaryName, logo];
    const response = await pool.query(query, values);

    res.json({message: 'Centro actualizado exitosamente'});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Error actualizando el centro'});
  }
});

export default router