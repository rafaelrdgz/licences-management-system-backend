import {Router} from "express";
import pool from "../DB_config.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const JWT_SECRET = process.env.JWT_SECRET;
const router = Router();

router.get("/login", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM login_trabajador($1, $2)", [
        req.query.email, req.query.password
      ]);
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
  
        // Generar un token JWT
        const token = jwt.sign(
          {
            id: user.id, // Puedes incluir más información relevante
            email: user.email,
            role: user.role
          },
          JWT_SECRET,
          { expiresIn: "1h" } // El token expirará en 1 hora
        );
        res.status(200).json({ token });
      } else {
        console.log('Usuario no encontrado');
        res.status(404).json({ error: "Worker not found" });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

export default router;