import pool from "../configs/dbConfig.js";

const createLicense = async (
  id,
  driverId,
  issueDate,
  expirationDate,
  restrictions,
  category
) => {
  const result = await pool.query(
    "SELECT * FROM insert_licencia($1, $2, $3, $4, $5, $6, $7, $8)",
    [id, driverId, issueDate, expirationDate, restrictions, false, 0, category]
  );
  return result;
};

const getLicenseById = async (id) => {
  const result = await pool.query("SELECT * FROM get_licencia_by_id($1)", [id]);
  return result;
};

const getLicenses = async () => {
  const result = await pool.query("SELECT * FROM get_licencias()");
  return result;
};

const getMissingCategories = async (id) => {
  const result = await pool.query("SELECT * FROM get_missing_categories($1)", [
    id,
  ]);
  return result;
};

const updateLicense = async (
  id,
  expirationDate,
  restrictions,
  renewed,
  points
) => {
  const result = await pool.query(
    "SELECT * FROM update_licencia($1, $2, $3, $4, $5)",
    [id, expirationDate, restrictions, renewed, points]
  );
  return result;
};

const addLicenseCategory = async (
  id,
  expirationDate,
  restrictions,
  renewed,
  points,
  category
) => {
  const result = await pool.query(
    "SELECT * FROM update_licencia($1, $2, $3, $4, $5, $6)",
    [id, expirationDate, restrictions, renewed, points, category]
  );
  return result;
};

const deleteLicense = async (id) => {
  const result = await pool.query("SELECT delete_licencia($1)", [id]);
  return result;
};

const LicensesServices = {
  createLicense,
  getLicenseById,
  getLicenses,
  getMissingCategories,
  updateLicense,
  addLicenseCategory,
  deleteLicense,
};

export default LicensesServices;
