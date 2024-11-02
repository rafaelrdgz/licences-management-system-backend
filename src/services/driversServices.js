import pool from "../configs/dbConfig.js";

const getDrivers = async () => {
  const result = await pool.query("SELECT * FROM get_conductores()");
  return result;
};

const getDriverByID = async (id) => {
  const result = await pool.query("SELECT * FROM get_conductor_by_id($1)", [
    id,
  ]);
  return result;
};

const updateDriver = async (
  id,
  name,
  lastNames,
  bornDate,
  address,
  phoneNumber,
  email,
  licenseStatus
) => {
  const result = await pool.query(
    "SELECT * FROM update_conductor($1, $2, $3, $4, $5, $6, $7, $8)",
    [id, name, lastNames, bornDate, address, phoneNumber, email, licenseStatus]
  );
  return result;
};

const deleteDriver = async (id) => {
  const result = await pool.query("SELECT delete_conductor($1)", [id]);
  return result;
};

const DriversServices = {
  getDrivers,
  getDriverByID,
  updateDriver,
  deleteDriver,
};

export default DriversServices;
