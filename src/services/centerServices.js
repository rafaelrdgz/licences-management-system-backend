import pool from "../configs/dbConfig.js";

const getCenter = async () => {
  const result = await pool.query("SELECT * FROM get_centro_by_id()");
  return result;
};

const updateCenter = async (
  code,
  name,
  address,
  phone,
  directorName,
  humanResourcesName,
  accountantName,
  syndicateSecretaryName
) => {
  const query = `SELECT update_centro($1, $2, $3, $4, $5, $6, $7, $8);`;

  const values = [
    code,
    name,
    address,
    phone,
    directorName,
    humanResourcesName,
    accountantName,
    syndicateSecretaryName,
  ];
  const response = await pool.query(query, values);
  return response;
};

const CenterServices = {
  getCenter,
  updateCenter,
};

export default CenterServices;
