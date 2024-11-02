import pool from "../configs/dbConfig.js";

const createClient = async (
  id,
  name,
  lastNames,
  bornDate,
  address,
  phoneNumber,
  email
) => {
  const result = await pool.query(
    "SELECT * FROM insert_persona($1, $2, $3, $4, $5, $6, $7)",
    [id, name, lastNames, bornDate, address, phoneNumber, email]
  );
  return result;
};

const getClients = async () => {
  const result = await pool.query("SELECT * FROM get_personas()");
  return result;
};

const getClientById = async (id) => {
  const result = await pool.query("SELECT * FROM get_persona_by_id($1)", [id]);
  return result;
};

const updateClient = async (
  id,
  name,
  lastNames,
  bornDate,
  address,
  phoneNumber,
  email
) => {
  const result = await pool.query(
    "SELECT * FROM update_persona($1, $2, $3, $4, $5, $6, $7)",
    [id, name, lastNames, bornDate, address, phoneNumber, email]
  );
  return result;
};

const deleteClient = async (id) => {
  const result = await pool.query("SELECT delete_persona($1)", [id]);
  return result;
};

const ClientsServices = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};

export default ClientsServices;
