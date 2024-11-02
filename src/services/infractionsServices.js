import pool from "../configs/dbConfig.js";

const createInfraction = async (
  id,
  licenseid,
  type,
  date,
  address,
  description,
  pointsDeducted,
  paid
) => {
  const result = await pool.query(
    "SELECT * FROM insert_infraccion($1, $2, $3, $4, $5, $6, $7, $8)",
    [id, licenseid, type, date, address, description, pointsDeducted, paid]
  );
  return result;
};

const getInfractions = async () => {
  const result = await pool.query("SELECT * FROM get_infracciones()");
  return result;
};

const getInfraction = async (id) => {
  const result = await pool.query("SELECT * FROM get_infraccion_by_id($1)", [
    id,
  ]);
  return result;
};

const updateInfraction = async (
  id,
  licenseid,
  type,
  date,
  address,
  description,
  pointsDeducted,
  paid
) => {
  const result = await pool.query(
    "SELECT * FROM update_infraccion($1, $2, $3, $4, $5, $6, $7, $8)",
    [id, licenseid, type, date, address, description, pointsDeducted, paid]
  );
  return result;
};

const deleteInfraction = async (id) => {
  const result = await pool.query("SELECT delete_infraccion($1)", [id]);
  return result;
};

const InfractionsServices = {
  createInfraction,
  getInfractions,
  getInfraction,
  updateInfraction,
  deleteInfraction,
};

export default InfractionsServices;
