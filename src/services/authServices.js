import pool from "../configs/dbConfig.js";

const loginWorker = async (email) => {
  // Obtener solo el usuario con el email proporcionado
  const result = await pool.query("SELECT * FROM login_trabajador($1)", [
    email,
  ]);
  return result;
};

const AuthServices = {
  loginWorker,
};

export default AuthServices;
