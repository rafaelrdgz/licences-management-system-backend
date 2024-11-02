import { config } from "dotenv";
import AuthServices from "../services/authServices.js";
import jwt from "jsonwebtoken";

config();
const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  try {
    const result = await AuthServices.loginWorker(
      req.query.email,
      req.query.password
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Generar un token JWT
      const token = jwt.sign(
        {
          id: user.id, // Puedes incluir más información relevante
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "5h" } // El token expirará en 5 horas
      );
      res.status(200).json({ token });
    } else {
      console.log("Usuario no encontrado");
      res.status(404).json({ error: "Worker not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
