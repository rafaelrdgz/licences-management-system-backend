import pool from "../configs/dbConfig.js";

const loginWorker = async (email, password) => {
  const result = await pool.query("SELECT * FROM login_trabajador($1, $2)", [
    email,
    password,
  ]);
  return result;
};

const AuthServices = {
  loginWorker,
};

export default AuthServices;
