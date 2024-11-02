import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar el token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extrae el token del encabezado

  if (!token) {
    return res.status(403).json({ error: "Token is required" }); // Si no hay token, devuelve un error
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" }); // Si el token es inválido, devuelve un error
    }

    req.user = decoded; // Guarda la información del usuario decodificado en la solicitud
    next(); // Continúa con la siguiente función de middleware o ruta
  });
};
