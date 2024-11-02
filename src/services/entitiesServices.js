import pool from "../configs/dbConfig.js";

const createEntity = async (
  id,
  name,
  type,
  address,
  phone,
  email,
  directorName
) => {
  const result = await pool.query(
    "SELECT * FROM insert_entidad($1, $2, $3, $4, $5, $6, $7)",
    [id, name, type, address, phone, email, directorName]
  );
  return result;
};

const getEntities = async () => {
  const result = await pool.query("SELECT * FROM get_entidades()");
  return result;
};

const getEntityById = async (id) => {
  const result = await pool.query("SELECT * FROM get_entidad_by_id($1)", [id]);
  return result;
};

const updateEntity = async (
  id,
  name,
  type,
  address,
  phone,
  email,
  directorName
) => {
  const result = await pool.query(
    "SELECT * FROM update_entidad($1, $2, $3, $4, $5, $6, $7)",
    [id, name, type, address, phone, email, directorName]
  );
  return result;
};

const deleteEntity = async (id) => {
  const result = await pool.query("SELECT delete_entidad($1)", [id]);
  return result;
};

const EntitiesServices = {
  createEntity,
  getEntities,
  getEntityById,
  updateEntity,
  deleteEntity,
};

export default EntitiesServices;
