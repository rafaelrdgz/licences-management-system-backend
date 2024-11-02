import pool from "../configs/dbConfig.js";

const createWorker = async (id, name, lastNames, email, password, role) => {
  const result = await pool.query(
    "SELECT * FROM insert_trabajador($1, $2, $3, $4, $5, $6)",
    [id, name, lastNames, email, password, role]
  );
  return result;
};

const getWorkers = async () => {
  const result = await pool.query("SELECT * FROM get_trabajadores()");
  return result;
};

const getWorkerByID = async (id) => {
  const result = await pool.query("SELECT * FROM get_trabajador_by_id($1)", [
    id,
  ]);
  return result;
};

const updateWorker = async (id, name, lastNames, email, password, role) => {
  const result = await pool.query(
    "SELECT * FROM update_trabajador($1, $2, $3, $4, $5, $6)",
    [id, name, lastNames, email, password, role]
  );
  return result;
};

const deleteWorker = async (id) => {
  const result = await pool.query("SELECT delete_trabajador($1)", [id]);
  return result;
};

const WorkersServices = {
  createWorker,
  getWorkers,
  getWorkerByID,
  updateWorker,
  deleteWorker,
};

export default WorkersServices;
